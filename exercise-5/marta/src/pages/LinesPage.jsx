import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import TrainList from '../components/TrainList';
import LineHeader from '../components/LineHeader';

export default function LinesPage() {
    const [currColor, setCurrColor] = useState("Gold");
    const [stationData, setStationData] = useState([]);
    const [trainData, setTrainData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const stations = await axios.get("/api/stations");
                //console.log('Stations:', stations.data);
                const trains = await axios.get("/api/train_data");
                console.log('Trains:', trains.data);
                setStationData(stations.data);
                setTrainData(trains.data); // Make sure this is an array
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="app-container">
            <NavBar stations={stationData} />
            <div className="main-content">
                <LineHeader lineName={currColor} />
                <TrainList trains={trainData.filter(train => train.LINE === currColor)} />
            </div>
        </div>
    );
}

