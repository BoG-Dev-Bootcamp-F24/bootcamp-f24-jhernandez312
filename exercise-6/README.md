# Exercise 6 - Advanced Marta Interface

## Description

In this exercise, bootcampers will familiarize themselves with TypeScript and data filtering techniques.

## Submission

See the submission instructions down below.

- **Due Date**: 10-17-2024

## Instructions

Simple instructions: We are improving our Marta Interface from Exercise 5!

To begin, please create a new vite application using the react-ts template and copy of your server, component, and pages folder from Exercise 5 into Exercise 6.

### Extending the functionality from exercise 5

We want to add four buttons that will change state when clicked (one for each line color). Refer to the visual examples below to see how this would look like. Additionally, whenever a user switches between lines, we also want the filter buttons to change (between Northbound/SouthBound and Eastbound/Westbound). This can be done either through conditional rendering or state. For example, the green line should have the buttons "Arriving", "Scheduled", "Eastbound", "Westbound"; whereas gold should have "Arriving", "Scheduled", "Northbound", "Southbound." We recommend passing props into the `TrainList` component to handle these.

### More filtering

Our navbar is now going to be operational! Make it so that when you click on a station in the navbar, it will become highlighted, and the trains displayed are filtered to display only those currently approaching that station, so for Doraville, we only want trains with `{"STATION": "DORAVILLE"}`.

We are going to make the buttons we created before operational. When a button is clicked it will filter the trains by the filter titled on the button. When a button is 'on', if it is clicked again the filter will go away. More than one button can be used to filter the data at a time, so make it identifiable that a button is currently "on" (you could do this by making the button color faded if it is on).

As a bonus, once the rest of the code displays successfully, we recommend incorporating conditional rendering so that if the filters used on the trainlist result in an empty list of trains, then display something else to notify the user that there are no trains rather than just displaying an empty page. For example, you could add a "No Current Trains Match Filters" message.

### Introduce Type Safety

Now that we are starting to use components that take in data and filter it, there is now the possibility that invalid data will be passed in and thus cause an error in our app. Firstly, we are going to want to change all of the JavaScript files to TypeScript. So if you have a .jsx file, rename it to .tsx and if you have a .js file rename it to .ts. Going through all the pages, add types to all of the useState hooks as well as the props of each component. Try to come up with types that are as specific as possible while leaving room for further extension. As you go along, try to see how TypeScript can be useful through catching errors that you might have made while coding the app previously as well as allowing you to easily see what makes up objects just by hovering over them.

**Requirements:**

- Incorporate state buttons to display trains based on each line color (gold, red, green blue)
- Make the navbar functional so that the trains are filtered by one station at a time
- Make the four buttons from Exercise 5 functional so that the trains are filtered by one or more buttons at a time
- Type
- Create a 0.5-2 minute demo video to showcase your project's functionality (this is just so that we don't have to go through and install dependencies / deal with versioning errors for every single exercise)
- Bonus: Conditional rendering for when there are no trains to display

## Display Example

**Gold**

<img width="500" alt="Screenshot 2023-10-16 at 10 08 13 PM" src="https://github.com/zinichakraborty/bootcampexercises-f23/assets/113480497/ab39f0c9-83d8-4232-90da-d026aca7ef7e">

**Green**

<img width="500" alt="Screenshot 2023-10-19 at 7 17 18 PM" src="https://github.com/BoG-Dev-Bootcamp-F23/bootcamp-f23/assets/113480497/043e7a06-614f-41f8-8ef9-5c6cf7523b02">
