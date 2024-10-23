import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import TrainList from '../components/TrainList';
import LineHeader from '../components/LineHeader';

const LinesPage: React.FC = () => {
    const [currColor, setCurrColor] = useState<string>("Gold");
    const [stationData, setStationData] = useState<any[]>([]);
    const [trainData, setTrainData] = useState<any[]>([]);
    const [directionButtons, setDirectionButtons] = useState<string[]>(["Northbound", "Southbound"]);
    const [activeFilters, setActiveFilters] = useState<string[]>([]); // Allow multiple filters
    const [selectedStation, setSelectedStation] = useState<string | null>(null); // Track selected station
    const [selectedDirection, setSelectedDirection] = useState<string | null>(null); // Track selected direction

    // Function to change the current line
    const handleLineChange = (line: string) => {
        setCurrColor(line);
        console.log("Current line set to:", line);

        // Reset filters when the line is changed
        setSelectedDirection(null);
        setActiveFilters([]); // Reset all active filters
        setSelectedStation(null); // Reset selected station

        // Set direction buttons based on the line selected
        if (line === "Gold" || line === "Red") {
            setDirectionButtons(["Northbound", "Southbound"]);
        } else if (line === "Green" || line === "Blue") {
            setDirectionButtons(["Eastbound", "Westbound"]);
        }
    };

    // Fetch station and train data on component load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const stationsResponse = await axios.get("http://localhost:5000/api/station_data");
                console.log('Fetched Stations:', stationsResponse.data);

                const trainsResponse = await axios.get("http://localhost:5000/api/train_data");
                console.log('Fetched Trains:', trainsResponse.data);

                setStationData(Array.isArray(stationsResponse.data) ? stationsResponse.data : []);
                setTrainData(Array.isArray(trainsResponse.data) ? trainsResponse.data : []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Function to handle station selection from NavBar (toggle functionality)
    const handleStationSelect = (station: string | null) => {
        if (selectedStation === station) {
            // If the clicked station is already selected, deselect it
            setSelectedStation(null);
        } else {
            // Otherwise, set it as the selected station
            setSelectedStation(station);
        }
        console.log("Selected station:", selectedStation === station ? 'None' : station);
    };

    // Function to handle direction button clicks (allow multiple directions)
    const handleDirectionChange = (direction: string) => {
        if (selectedDirection === direction) {
            // If the direction is already active, toggle it off
            setSelectedDirection(null);
        } else {
            setSelectedDirection(direction);
        }
        console.log("Selected direction:", selectedDirection === direction ? 'None' : direction);
    };

    // Function to handle status filter button clicks (allow multiple status filters)
    const toggleFilter = (filter: string) => {
        if (activeFilters.includes(filter)) {
            // If the filter is already active, remove it
            setActiveFilters(activeFilters.filter(f => f !== filter));
        } else {
            // Otherwise, add the new filter
            setActiveFilters([...activeFilters, filter]);
        }
        console.log("Active filters:", activeFilters);
    };

    const filteredTrainData = trainData.filter(train => {
        let matchesLine = train.LINE.toLowerCase() === currColor.toLowerCase();
        let matchesStation = true;
        let matchesDirection = true;
        let matchesFilters = true;

        // Normalize the station names for comparison
        if (selectedStation) {
            const normalizedSelectedStation = selectedStation.toLowerCase().replace(" station", "").trim();
            const normalizedTrainStation = train.STATION.toLowerCase().replace(" station", "").trim();

            matchesStation = normalizedTrainStation === normalizedSelectedStation;
            console.log("Filtering train by station:", train.STATION); // Debug log to verify filtering by station
        }

        // Filter by the selected direction (if any)
        if (selectedDirection) {
            matchesDirection = train.DIRECTION === selectedDirection;
        }

        // Filter by multiple status filters (e.g., Arriving, Scheduled)
        if (activeFilters.includes('Arriving')) {
            const waitingSeconds = parseInt(train.WAITING_SECONDS);
            matchesFilters = matchesFilters && waitingSeconds <= 60; // Consider "Arriving" as trains arriving in 2 minutes or less
        }

        if (activeFilters.includes('Scheduled')) {
            const waitingSeconds = parseInt(train.WAITING_SECONDS);
            matchesFilters = matchesFilters && waitingSeconds > 60; // Scheduled trains arriving in more than 2 minutes
        }

        // Return trains that match all active filters
        return matchesLine && matchesStation && matchesDirection && matchesFilters;
    });

    // Correctly fetch stations for the current line
    const currentLineStations = stationData.find(line => line.line.toLowerCase() === currColor.toLowerCase());

    return (
        <div className="app-container">
            <NavBar
                stations={currentLineStations ? currentLineStations.stations : []}
                onStationSelect={handleStationSelect} // Pass the station select handler to NavBar
            />

            <div className="main-content">
                <LineHeader
                    lineName={currColor}
                    handleLineChange={handleLineChange}
                    directionButtons={directionButtons}
                    activeFilters={activeFilters}
                    toggleFilter={toggleFilter}
                    onDirectionChange={handleDirectionChange}
                    selectedDirection={selectedDirection}
                />

                {filteredTrainData.length > 0 ? (
                    <TrainList trains={filteredTrainData} currColor={currColor} />
                ) : (
                    <p>No trains available for the {currColor} line.</p>
                )}
            </div>
        </div>
    );
};

export default LinesPage;
