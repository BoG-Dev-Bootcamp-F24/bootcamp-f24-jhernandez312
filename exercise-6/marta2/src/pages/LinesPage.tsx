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
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [selectedStation, setSelectedStation] = useState<string | null>(null);
    const [selectedDirection, setSelectedDirection] = useState<string | null>(null);


    const handleLineChange = (line: string) => {
        setCurrColor(line);
        console.log("Current line set to:", line);


        setSelectedDirection(null);
        setActiveFilters([]);
        setSelectedStation(null);

        if (line === "Gold" || line === "Red") {
            setDirectionButtons(["Northbound", "Southbound"]);
        } else if (line === "Green" || line === "Blue") {
            setDirectionButtons(["Eastbound", "Westbound"]);
        }
    };

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

    const handleStationSelect = (station: string | null) => {
        if (selectedStation === station) {
            setSelectedStation(null);
        } else {
            setSelectedStation(station);
        }
        console.log("Selected station:", selectedStation === station ? 'None' : station);
    };

    const handleDirectionChange = (direction: string) => {
        if (selectedDirection === direction) {
            setSelectedDirection(null);
        } else {
            setSelectedDirection(direction);
        }
        console.log("Selected direction:", selectedDirection === direction ? 'None' : direction);
    };

    const toggleFilter = (filter: string) => {
        if (activeFilters.includes(filter)) {
            setActiveFilters(activeFilters.filter(f => f !== filter));
        } else {
            setActiveFilters([...activeFilters, filter]);
        }
        console.log("Active filters:", activeFilters);
    };

    const filteredTrainData = trainData.filter(train => {
        let matchesLine = train.LINE.toLowerCase() === currColor.toLowerCase();
        let matchesStation = true;
        let matchesDirection = true;
        let matchesFilters = true;

        if (selectedStation) {
            const normalizedSelectedStation = selectedStation.toLowerCase().replace(" station", "").trim();
            const normalizedTrainStation = train.STATION.toLowerCase().replace(" station", "").trim();

            matchesStation = normalizedTrainStation === normalizedSelectedStation;
            console.log("Filtering train by station:", train.STATION);
        }

        if (selectedDirection) {
            matchesDirection = train.DIRECTION === selectedDirection;
        }

        if (activeFilters.includes('Arriving')) {
            const waitingSeconds = parseInt(train.WAITING_SECONDS);
            matchesFilters = matchesFilters && waitingSeconds <= 60;
        }

        if (activeFilters.includes('Scheduled')) {
            const waitingSeconds = parseInt(train.WAITING_SECONDS);
            matchesFilters = matchesFilters && waitingSeconds > 60;
        }

        return matchesLine && matchesStation && matchesDirection && matchesFilters;
    });

    const currentLineStations = stationData.find(line => line.line.toLowerCase() === currColor.toLowerCase());

    return (
        <div className="app-container">
            <NavBar
                stations={currentLineStations ? currentLineStations.stations : []}
                onStationSelect={handleStationSelect}
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
