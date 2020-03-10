const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//displays index.html of root path
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});
//invoked after hitting go in the html form
app.post("/", function (req, res) {

    // takes in the city from the html form, display in console. Takes in as String.
    var cityname = String(req.body.cityInput);
    console.log(req.body.cityInput);// Test to make sure the right city passes to the variable.

    /*To import data, the URL needs to be created based on a JSON query, my API key is 67f6b382921c1e89b39b20d4f9556f22*/
    const units = "imperial";
    const apiKey = "67f6b382921c1e89b39b20d4f9556f22";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=" + units + "&APPID=" + apiKey;

    // this gets the data from Open WeatherAPI
    https.get(url, function (response) {
        console.log(response.statusCode);

        // gets individual items from Open Weather API
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            /* JSON.parse reads the JSON data and allows you to assign the data to variables*/
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            // Displays the results to the webpage.
            res.write("<h1> The weather is " + weatherDescription + "<h1>");
            res.write("<h2>The Temperature in " + city + " is " + temp + " Degrees Fahrenheit<h2>");
            res.write("Humidity is " + humidity + "% with wind speed of " + windSpeed + " miles/hour");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
})
//Commented out these lines in Repl
//Uncomment these lines when running on laptop
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port")
});