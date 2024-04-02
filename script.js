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
      let weatherDiv = document.createElement("div");
      const cityNameEL = document.createElement("h2");
      const currentDateEL = document.createElement("h3");
      const weatherIcon = data["weather"][0]["icon"];
      const weatherIconEL = document.createElement("p");
      const currentTempEL = document.createElement("ul");
      const windSpeedEL = document.createElement("ul");
      const humidityEL = document.createElement("ul");
      //add text content to element, icons as well
      cityNameEL.textContent = data.name;
      currentDateEL.textContent = data.dt_txt;
      currentTempEL.textContent = "Temperature is: " + data.main.temp + " Fahrenheit";
      windSpeedEL.textContent = "Wind speeds are: " +data.wind.speed + " miles/hour";
      humidityEL.textContent = "Humidity is: " + data.main.humidity + " %";
      var weatherIconURL =
        "<img class = 'weather-icon' src= 'https://openweathermap.org/img/wn/" +
        weatherIcon +
        "@2x.png' />";
      //weatherIconEL.setAttribute("src", data.weather.icon);
      console.log(weatherIcon);
      //append to currentWeatherBox
      weatherIconEL.innerHTML = weatherIconURL;

      weatherDiv.append(
        cityNameEL,
        currentDateEL,
        weatherIconEL,
        currentTempEL,
        windSpeedEL,
        humidityEL
      );
      currentWeatherBox.append(weatherDiv);
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
    const currentTempEL = document.createElement("ul");
    const windSpeedEL = document.createElement("ul");
    const humidityEL = document.createElement("ul");

    var weatherIconURL =
    "<img class = 'weather-icon' src= 'https://openweathermap.org/img/wn/" +
    weatherIcon +
    "@2x.png' />";

    weatherIconEL.innerHTML = weatherIconURL;
    currentDateEL.textContent = data.list[i].dt_txt;
    currentTempEL.textContent = "Temp: " + data.list[i].main.temp + " F";
    windSpeedEL.textContent = "Winds: " +data.list[i].wind.speed + " m/h";
    humidityEL.textContent = "Humidity: " +data.list[i].main.humidity + "%";

    forecastDiv.append(currentDateEL,weatherIconEL,currentTempEL,windSpeedEL,humidityEL)
    forecastWeatherBox.append(forecastDiv)


  }

    });

    
}
function clearPreviousSearch(){
  
currentWeatherBox.textContent = "";
forecastWeatherBox.textContent= "";

}
function start() {
  clearPreviousSearch();
  get5DayForecast(userInput.value);
  getCurrentWeather(userInput.value);
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
