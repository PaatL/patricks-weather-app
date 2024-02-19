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
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("current", data);
      console.log(data.name);
      console.log(data.main.temp_max);
      //display current weather, including ws, h, tempmin/max, city name, date, weather icons

      //create elements for above data elements
      const cityNameEL = document.createElement("h2");
      const currentDateEL = document.createElement("h3");
      const weatherIcon = data["weather"][0]["icon"];
      const weatherIconEL = document.createElement("p");
      const currentTempEL = document.createElement("li");
      const windSpeedEL = document.createElement("li");
      const humidityEL = document.createElement("li");
      //add text content to element, icons as well
      cityNameEL.textContent = data.name;
      currentDateEL.textContent = data.timezone;
      currentTempEL.textContent = data.main.temp;
      windSpeedEL.textContent = data.wind.speed;
      humidityEL.textContent = data.main.humidity;
      var weatherIconURL =
        "<img class = 'weather-icon' src= 'https://openweathermap.org/img/wn/" +
        weatherIcon +
        "@2x.png' />";
      //weatherIconEL.setAttribute("src", data.weather.icon);
      console.log(weatherIcon);
      //append to currentWeatherBox
      weatherIconEL.innerHTML = weatherIconURL;
      currentWeatherBox.append(
        cityNameEL,
        weatherIconEL,
        currentTempEL,
        windSpeedEL,
        humidityEL
      );
    });
}
function get5DayForecast(data) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    data +
    "&units=imperial&appid=" +
    apiKey;
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("forecast", data);
      const fiveDayForecastEL = document.createElement("h2");
    
      fiveDayForecastEL.textContent = "5-Day Forecast";
    
      forecastWeatherBox.append(fiveDayForecastEL);
  //  loop through the data and append the cards to the page with the content from the API filled in.
  for(var i = 4; i <data.list.length; i+=8){
    console.log(data.list[i]);
    const forecastDiv = document.createElement("div");
    const currentDateEL = document.createElement("h3");
    const weatherIcon = data.list[i].weather[0].icon;
    const weatherIconEL = document.createElement("p");
    const currentTempEL = document.createElement("li");
    const windSpeedEL = document.createElement("li");
    const humidityEL = document.createElement("li");

    var weatherIconURL =
    "<img class = 'weather-icon' src= 'https://openweathermap.org/img/wn/" +
    weatherIcon +
    "@2x.png' />";

    weatherIconEL.innerHTML = weatherIconURL;
    currentDateEL.textContent = data.list[i].dt_txt;
    currentTempEL.textContent = data.list[i].main.temp;
    windSpeedEL.textContent = data.list[i].wind.speed;
    humidityEL.textContent = data.list[i].main.humidity;


    forecastDiv.append(currentDateEL,weatherIconEL,currentTempEL,windSpeedEL,humidityEL)
    forecastWeatherBox.append(forecastDiv)


  }

    });
}
function start() {
  getCurrentWeather(userInput.value);
  get5DayForecast(userInput.value);
  saveSearchToStorage(userInput.value);
}

function readSearchFromStorage() {
  var searchHistory = localStorage.getItem("searches");
  if (searchHistory) {
    searchHistory = JSON.parse(searchHistory);
  } else {
    searchHistory = [];
  }
  return searchHistory;
}
function saveSearchToStorage(searches) {
  localStorage.setItem("searches", JSON.stringify(searches));
}
//grab input element
//grab button element
//add event listener to button element
//create a function called searchByCity that takes input and searches through the api

submitButton.addEventListener("click", start);
