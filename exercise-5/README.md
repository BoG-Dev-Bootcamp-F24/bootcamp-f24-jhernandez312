# Exercise 5 - Simple Marta Interface

## Description

In this exercise, bootcampers will familiarize themselves with UI/JSX, functional components, props, state, and fetching data from a MongoDB Atlas database.

## Submission

See the submission instructions down below.

- **Due Date**: 10-10-2024

## Instructions

_HIGHLY RECOMMEND READING THROUGH THE WHOLE README BEFORE BEGINNING_

Simple instructions: We are creating a simple Marta Interface to display train data for each _train line_ on a single page. This exercise will be built upon in Exercise 6.

To get started, create a `pages`, `server`, and `components` folder within `src`. In the `pages` folder, create a page component named `LinesPage.js`. This page will display the entire interface. Also, create a component called `TrainList.js`. This component should have a prop specifying the line color (i.e., blue, gold, red, or green) and will contain the interface for all trains in the given line. The current line that's being displayed should be stored as a state in the `LinesPage` component.

Here’s some barebones code for the structure:

```js
import { useState, useEffect } from "react";
import axios from "axios";

// fetch data from MongoDB Atlas
const fetchStationData = async () => await axios.get("URL/api/stations");
const fetchTrainData = async () => await axios.get("URL/api/trains");

export default function LinesPage() {
  const [currColor, setCurrColor] = useState("red");
  const [stationData, setStationData] = useState([]);
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stations = await fetchStationData();
      const trains = await fetchTrainData();
      setStationData(stations.data);
      setTrainData(trains.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* YOUR JSX CODE */}
      <NavBar color={currColor} data={stationData} />
      <TrainList color={currColor} data={trainData} />
      {/* YOUR JSX CODE */}
    </div>
  );
}
```

### Setting Up MongoDB Atlas

1. Create a [MongoDB Atlas Cluster](https://www.mongodb.com/docs/atlas/getting-started/)
2. Add train and station data into your MongoDB Atlas cluster. Writing a script is highly recommended. Also think about how to structure the data in MongoDB as well. Hint: Try to split the data into individual parts as best as you can
3. Create a simple API to connect your React frontend to MongoDB Atlas. You can use Node.js and Express for this:

   ```js
   const express = require("express");
   const mongoose = require("mongoose");

   const app = express();
   const PORT = process.env.PORT || 5000;

   mongoose.connect("<your-mongodb-connection-string>", {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });

   const trainSchema = new mongoose.Schema({
     /* YOUR SCHEMA HERE */
   });
   const stationSchema = new mongoose.Schema({
     /* YOUR SCHEMA HERE */
   });

   const Train = mongoose.model("Train", trainSchema);
   const Station = mongoose.model("Station", stationSchema);

   app.get("/api/trains", async (req, res) => {
     const trains = await Train.find();
     res.json(trains);
   });

   app.get("/api/stations", async (req, res) => {
     const stations = await Station.find();
     res.json(stations);
   });

   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

The data is formatted identically to the MARTA API's data: consisting of an object that containing an array of train objects, i.e. `{[Train1's data, Train2's data, Train3's data , ...]}`. Within the `TrainList.js` component, the data should be filtered to only return info for trains that are part of the specific line. For example, for the gold line we only want an array of gold trains (i.e. only include objects with the property `"LINE":"GOLD"`).

In the components folder, create a `Train.js` file. In this file you can create the design for an exportable Train component that takes in the data for one train and returns the display for it. To display whether or not a train is _On Time_ or _Delayed_ check if `DELAY === "T0S"` (if the equality is true, it is on time, and if not, we consider it delayed). Follow the Figma page below for an aesthetic design of a train component or come up with your own design including the same information!

_Sample Train Component_

<img width="339" alt="Screenshot 2023-10-02 at 4 01 22 PM" src="https://github.com/BoG-Dev-Bootcamp-F23/bootcamp-f23/assets/113480497/07c16887-f509-41e0-bbf2-759946143c91">

Display each of the train components for the specified line (first make sure to import the Train component into the file). _Hint: You do not need to display each component manually as the number of trains in a line or subject to change._ Instead you can use the `map` and `spread` functions you learned in Exercise 4 to take in the props at each index and display a component for each train's props.

Once you have reached this step, we will construct UI that will be used in Exercise 6 (this is still a required part of Exercise 5). We ask that you create a non-functional navbar somewhere on the screen. (In Exercise 6 we will display information for each train line so the dropdown for each train line page will change).

We can create a `Navbar.js` file in `components`. This will contain an exportable navbar display component, which we can import into `LinesPage.js`. The `stationData.js` file holds the stations for each line as an object with arrays associated with lines. The navbar component will be displayed with the props for their specific stations, called from `stationData.js`. Reference the Figma design at the bottom to see what this looks like (it's the component with "select your starting station").

Lastly, we want four nonfunctional buttons to be displayed titled 'Arriving', 'Scheduled', 'Northbound', and 'Southbound' on each of the pages. For the green and blue lines, use 'Eastbound' and 'Westbound' instead. These buttons will become operational in Exercise 6.

### Requirements

1. In `src`, create three folders: `pages`, `server`, and `components`.
2. Set up your MongoDB Atlas cluster and API
3. Update all component data to pull dynamically from MongoDB Atlas via API endpoints.
4. In `App.js`, display the `LinesPage.js` as your main page.
5. Display each train's data dynamically by feeding each entry from the filtered array into the `Train.js` component as props.
6. Create a non-functional navbar that dynamically displays stations using `stationData` fetched from MongoDB Atlas.
7. Add four non-functional buttons titled 'Arriving', 'Scheduled', 'Northbound', and 'Southbound' on each of the pages. For the green and blue lines, use 'Eastbound' and 'Westbound' instead.

## Overall Figma Design

_Sample Gold Page_

<img width="480" alt="Screenshot 2023-10-02 at 4 01 14 PM" src="https://github.com/BoG-Dev-Bootcamp-F23/bootcamp-f23/assets/113480497/10278e35-c7a6-4480-94ce-9a06a39d6ecd">
