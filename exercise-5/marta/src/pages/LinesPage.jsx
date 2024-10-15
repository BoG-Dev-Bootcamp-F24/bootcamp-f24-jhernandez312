import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import TrainList from '../components/TrainList';
import LineHeader from '../components/LineHeader';

export default function LinesPage() {
    const [currColor, setCurrColor] = useState("Red");
    const [stationData, setStationData] = useState([]);
    const [trainData, setTrainData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const stationsResponse = await axios.get("http://localhost:5000/api/station_data");
                console.log('Fetched Stations:', stationsResponse.data); // Log station data


                const trainsResponse = await axios.get("http://localhost:5000/api/train_data");
                console.log('Fetched Trains:', trainsResponse.data); // Log train data array


                setStationData(Array.isArray(stationsResponse.data) ? stationsResponse.data : []);
                setTrainData(Array.isArray(trainsResponse.data) ? trainsResponse.data : []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const currentLineStations = stationData.find(line => line.line.toLowerCase() === currColor.toLowerCase());
    console.log("Current Line Stations for", currColor, ":", currentLineStations);

    const filteredTrainData = trainData.filter(train => train.LINE.toLowerCase() === currColor.toLowerCase());
    console.log("Filtered Train Data for", currColor, ":", filteredTrainData); // Debug log for filtered train data

    return (
        <div className="app-container">
            <NavBar stations={currentLineStations ? currentLineStations.stations : []} />
            <div className="main-content">
                <LineHeader lineName={currColor} />
                {filteredTrainData.length > 0 ? (
                    <TrainList trains={filteredTrainData} />
                ) : (
                    <p>No trains available for the {currColor} line.</p>
                )}
            </div>
        </div>
    );
}
