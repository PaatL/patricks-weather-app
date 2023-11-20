var apiKey = "18705bc5cd44be230c6173bdf7176bef";
var submitButton = document.getElementById("submit-button");
var userInput = document.getElementById("user-input");
var currentWeatherBox = document.getElementById("current");
var forecastWeatherBox = document.getElementById("forecast");

function getCurrentWeather(data) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    data +
    "&units=imperial&appid=" +
    apiKey;
  fetch(apiUrl).then(function (res) {
    return res.json();
  }).then(function(data){
    console.log('current', data);
    console.log(data.name);
    console.log(data.main.temp_max);
    //display current weather, including ws, h, tempmin/max, city name, date, weather icons

    //create elements for above data elements
 const cityNameEL = document.createElement('h3');
 const currentDateEL = document.createElement('h3');
const weatherIconEL = document.createElement("img");
const currentTempEL = document.createElement('li');
const windSpeedEL = document.createElement('li');
const humidityEL = document.createElement('li');
//add text content to element, icons as well
cityNameEL.textContent = data.name; 
currentDateEL.textContent = data.timezone;
currentTempEL.textContent = data.main.temp;
windSpeedEL.textContent= data.wind.speed;
humidityEL.textContent = data.main.humidity;
weatherIconEL.setAttribute('src',data.weather.icon); 
console.log(weatherIconEL);
//append to currentWeatherBox
currentWeatherBox.append(cityNameEL,weatherIconEL,currentTempEL,windSpeedEL,humidityEL);
  });
}
function get5DayForecast(data){
    var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    data +
    "&units=imperial&appid=" +
    apiKey;
  fetch(apiUrl).then(function (res) {
    return res.json();
  }).then(function(data){
    console.log('forecast', data);
  })
  const fiveDayForecastEL = document.createElement('h2');

  fiveDayForecastEL.textContent = "5-Day Forecast";

  forecastWeatherBox.append(fiveDayForecastEL);
}
function start() {
  getCurrentWeather(userInput.value);
  get5DayForecast(userInput.value);
}
//grab input element
//grab button element
//add event listener to button element
//create a function called searchByCity that takes input and searches through the api

submitButton.addEventListener("click", start);
