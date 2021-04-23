let now = new Date();
let h2 = document.querySelector("h2");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
h2.innerHTML = `${day}, ${hours}:${minutes}`;

function displayForecast(response){
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let weekDays = ["Thu", "Fri", "Sat", "Sun"];
  weekDays.forEach(function(day) {

  

  forecastHTML = 
    forecastHTML +
    `
      <div class="col-2">
          <ul class="forecast">
                <li class = "weather-forecast-date">${day}</li>
                <li>🌧</li>
                <li><strong>25°</strong>/13°</li>
          </ul>
      </div>
    `;
  });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c57da7dd69e31992e1e87848bd2d43df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector(
    "#displayedCity"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
   document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#today-description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#today-temperature-high").innerHTML = Math.round(
    response.data.main.temp_max);

  document.querySelector("#today-temperature-low").innerHTML = Math.round(
    response.data.main.temp_min);
    
  let iconElement = document.querySelector ("#icon");
  iconElement.setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
  


}

function searchCity(city) {
  let apiKey = "c57da7dd69e31992e1e87848bd2d43df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
searchCity("Biddeford");



function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityInput);


function getCurrentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "c57da7dd69e31992e1e87848bd2d43df";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
    }

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showPosition);



