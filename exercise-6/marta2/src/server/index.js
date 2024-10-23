import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

mongoose.connect("mongodb+srv://jhernandez312:1234@cluster0.1lvns.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully to 'test' database");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

const trainSchema = new mongoose.Schema({
    DESTINATION: String,
    DIRECTION: String,
    EVENT_TIME: String,
    HEAD_SIGN: String,
    LINE: String,
    NEXT_ARR: String,
    STATION: String,
    TRAIN_ID: String,
    WAITING_SECONDS: String,
    WAITING_TIME: String,
    RESPONSETIMESTAMP: String,
    VEHICLELONGITUDE: String,
    VEHICLELATITUDE: String,
    DELAY: String,
    TRIP_ID: String
});


const stationSchema = new mongoose.Schema({
    line: String,
    stations: [String]
});


const Train = mongoose.model("Train", trainSchema, 'train_data');
const Station = mongoose.model("Station", stationSchema, 'station_data');

app.get("/api/train_data", async (req, res) => {
    try {
        const trains = await Train.find();
        res.json(trains);
    } catch (error) {
        console.error("Error fetching train data:", error);
        res.status(500).json({ message: "Error fetching train data" });
    }
});

app.get("/api/station_data", async (req, res) => {
    try {
        const stations = await Station.find();
        res.json(stations);
    } catch (error) {
        console.error("Error fetching station data:", error);
        res.status(500).json({ message: "Error fetching station data" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
