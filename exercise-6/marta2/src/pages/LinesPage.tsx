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
    const [activeFilters, setActiveFilters] = useState<string[]>([]); // Manage active filters
    const [selectedStation, setSelectedStation] = useState<string | null>(null); // Track selected station

    // Function to change the current line
    const handleLineChange = (line: string) => {
        setCurrColor(line);
        console.log("Current line set to:", line);
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

    // Function to handle filter button clicks
    const toggleFilter = (filter: string) => {
        if (activeFilters.includes(filter)) {
            setActiveFilters(activeFilters.filter(f => f !== filter));
        } else {
            setActiveFilters([...activeFilters, filter]);
        }
    };

    // Filter train data based on selected station and active filters
    const filteredTrainData = trainData.filter(train => {
        let matchesLine = train.LINE.toLowerCase() === currColor.toLowerCase();
        let matchesStation = true;

        if (selectedStation) {
            matchesStation = train.STATION === selectedStation;
            console.log("Filtering train by station:", train.STATION); // Debug log to verify filtering by station
        }

        let matchesFilters = true;
        if (activeFilters.includes('Arriving')) {
            matchesFilters = train.STATUS === 'Arriving';
        }
        if (activeFilters.includes('Scheduled')) {
            matchesFilters = train.STATUS === 'Scheduled';
        }

        return matchesLine && matchesStation && matchesFilters;
    });

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
                    activeFilters={activeFilters} // Pass active filters
                    toggleFilter={toggleFilter} // Pass filter toggle function
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
