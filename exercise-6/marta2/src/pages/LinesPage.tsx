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
    const [activeFilter, setActiveFilter] = useState<string | null>(null); // Only one filter can be active
    const [selectedStation, setSelectedStation] = useState<string | null>(null); // Track selected station
    const [selectedDirection, setSelectedDirection] = useState<string | null>(null); // Track selected direction

    // Function to change the current line
    const handleLineChange = (line: string) => {
        setCurrColor(line);
        console.log("Current line set to:", line);

        // Reset filters when the line is changed
        setSelectedDirection(null);
        setActiveFilter(null);
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

    // Function to handle station selection from NavBar
    const handleStationSelect = (station: string | null) => {
        setSelectedStation(station); // Update the selected station
        console.log("Selected station:", station); // Debug the selected station
    };

    // Function to handle direction button clicks
    const handleDirectionChange = (direction: string) => {
        if (selectedDirection === direction) {
            // If the selected direction is already active, toggle it off (return train list to normal)
            setSelectedDirection(null);
            setActiveFilter(null); // Reset the active filter as well
        } else {
            // Otherwise, set the selected direction and reset active status filters
            setSelectedDirection(direction);
            setActiveFilter(null); // Ensure no status filter is active
        }
        console.log("Selected direction:", selectedDirection === direction ? 'None' : direction);
    };

    // Function to handle status filter button clicks (Arriving, Scheduled)
    const toggleFilter = (filter: string) => {
        if (activeFilter === filter) {
            // If the current filter is already active, toggle it off
            setActiveFilter(null);
            setSelectedDirection(null); // Reset direction as well
        } else {
            // Otherwise, set the active filter and reset direction
            setActiveFilter(filter);
            setSelectedDirection(null); // Ensure no direction is active
        }
        console.log("Selected filter:", activeFilter === filter ? 'None' : filter);
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

        if (selectedDirection) {
            matchesDirection = train.DIRECTION === selectedDirection;
            console.log("Filtering train by direction:", train.DIRECTION); // Debug log to verify filtering by direction
        }

        if (activeFilter === 'Arriving') {
            const waitingSeconds = parseInt(train.WAITING_SECONDS);
            matchesFilters = waitingSeconds <= 60; // Consider "Arriving" as trains arriving in 2 minutes or less
        } else if (activeFilter === 'Scheduled') {
            const waitingSeconds = parseInt(train.WAITING_SECONDS);
            matchesFilters = waitingSeconds > 60; // Scheduled trains arriving in more than 2 minutes
        }

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
                    activeFilters={activeFilter ? [activeFilter] : []} // Pass active filters as an array
                    toggleFilter={toggleFilter} // Pass filter toggle function
                    onDirectionChange={handleDirectionChange} // Pass direction change function
                    selectedDirection={selectedDirection} // Pass selected direction
                />

                {/* Conditionally render TrainList */}
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
