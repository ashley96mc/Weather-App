function formatDate(timestamp){

  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
  hours = `0${hours}`;
    }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]; 
  return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function(forecastDay, index) 
  { if (index <6) {

  forecastHTML = 
    forecastHTML +
    `
      <div class="col-2">
          <ul class="forecast">
                <li class = "weather-forecast-date">${formatDay(forecastDay.dt)}</li>
               
                <li><img
                        src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                        alt = ""
                        width = "42"
                </li>
                <li><span class = "forecast-temperature-max">${Math.round(forecastDay.temp.max)}°
                    <span class = "forecast-temperature-min">/${Math.round(forecastDay.temp.min)}°</span></li>
          </ul>
      </div>
    `;
  }
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

  let dateElement = document.querySelector("#date-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

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



