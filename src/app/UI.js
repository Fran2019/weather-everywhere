export class UI {

  constructor() {
    this.location = document.getElementById('weather-location');
    this.desc = document.getElementById('weather-description');
    this.string = document.getElementById('weather-string');
    this.humidity = document.getElementById('weather-humidity');
    this.wind = document.getElementById('weather-wind');
  }

  render(weather) {
    console.log(weather);
    const country = weather.sys?.country || 'N/A';
    const description = weather.weather?.[0]?.description || 'No description';
    const temp = weather.main?.temp ?? 'N/A';
    const humidity = weather.main?.humidity ?? 'N/A';
    const windSpeed = weather.wind?.speed ?? 'N/A';

    this.location.textContent = `${weather.name} / ${country}`;
    this.desc.textContent = description;
    this.string.textContent = `${temp} °C`;
    this.humidity.textContent = `Humidity: ${humidity}°C`;
    this.wind.textContent = `Weather ${windSpeed} m/s`;
  }

}