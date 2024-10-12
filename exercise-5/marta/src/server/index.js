import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
mongoose.connect("mongodb+srv://jhernandez312:1234@cluster0.1lvns.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const trainSchema = new mongoose.Schema({
    LINE: String,
    TRAIN_ID: String,
    DELAY: String,
    // add more fields based on your data structure
});

const stationSchema = new mongoose.Schema({
    NAME: String,
    LINE: String,
    // add more fields
});

const Train = mongoose.model("Train", trainSchema);
const Station = mongoose.model("Station", stationSchema);

app.get("/api/train_data", async (req, res) => {
    const trains = await Train.find();
    res.json(trains);
});

app.get("/api/stations", async (req, res) => {
    const stations = await Station.find();
    res.json(stations);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
