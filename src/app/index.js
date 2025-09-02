import './index.css';
const { Store } = require('./Store');
const { Weather } = require('./Weather');

const store = new Store();
const {city, countryCode}= store.getLocationData();
const weather = new Weather(city, countryCode);
console.log('app iniciada');


async function fetchWeather() {
  const data = await weather.getWeather()
  updateWeather(data);
}


// update weather function 
function updateWeather(weatherData) {
  const widget = document.getElementById('weather-widget-card');
  const cityEl = document.getElementById('weather-location');
  const tempEl = document.getElementById('weather-string');
  const conditionEl = document.getElementById('weather-description');
  const humidityEl = document.getElementById('weather-humidity');
  const windEl = document.getElementById('weather-wind');

  if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
    cityEl.textContent = "City not found 😢";
    tempEl.textContent = "";
    conditionEl.textContent = "";
    humidityEl.textContent = "";
    windEl.textContent = "";
    widget.className = "weather-widget-card cloudy"; 
    return;
  }

  //show data
  cityEl.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
  tempEl.textContent = `${weatherData.main.temp}°C`;
  conditionEl.textContent = weatherData.weather[0].description;
  humidityEl.textContent = `Humidity: ${weatherData.main.humidity}%`;
  windEl.textContent = `Wind: ${weatherData.wind.speed} m/s`;


  // clean weather classes
  widget.className = 'weather-widget-card';

  const condition = weatherData.weather[0].main.toLowerCase();
  
  // Assigning class depending on the weather conditions
  if(condition.includes('clear')) {
    widget.classList.add('sunny');
  } else if(condition.includes('clouds')) {
    widget.classList.add('cloudy');
  } else if(condition.includes('rain')) {
    widget.classList.add('rainy');
  } else if(condition.includes('snow')) {
    widget.classList.add('snowy');
  }
}


document.getElementById('w-change-btn').addEventListener('click', (e) => {
  e.preventDefault(); //avoids a reload in the Form
  const city = document.getElementById('city').value;
  const countryCode = document.getElementById('countryCode').value
  
  weather.changeLocation(city, countryCode);
  store.setLocationData(city, countryCode);
  fetchWeather();
});


//Reload weather at the beginning
document.addEventListener('DOMContentLoaded', fetchWeather);

