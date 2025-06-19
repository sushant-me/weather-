document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const searchBtn = document.getElementById("search-btn");
  const weatherInfoDiv = document.getElementById("weather-info");
  const errorMessage = document.getElementById("error-message");

  const cityNameElement = document.getElementById("city-name");
  const weatherIcon = document.getElementById("weather-icon");
  const temperatureElement = document.getElementById("temperature");
  const descriptionElement = document.getElementById("description");
  const windSpeedElement = document.getElementById("wind-speed");
  const humidityElement = document.getElementById("humidity");

  // Your OpenWeatherMap API key (the one named 'sushant' in your screenshot)
  const API_KEY = "0e5b30294e0f46b41919e707ad8bdde2";

  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeatherData(city);
    } else {
      displayError("Please enter a city name.");
    }
  });

  cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });

  async function fetchWeatherData(city) {
    // CORRECTED URL back to OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // OpenWeatherMap error handling (checks for `response.ok` or a specific error code like 404)
      if (response.ok) {
        displayWeatherData(data);
      } else {
        // OpenWeatherMap's error message is often in data.message
        displayError(data.message || "City not found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      displayError("Could not fetch weather data. Please try again later.");
    }
  }

  function displayWeatherData(data) {
    errorMessage.classList.add("hidden");
    weatherInfoDiv.classList.remove("hidden");

    // Data parsing for OpenWeatherMap's response structure
    cityNameElement.textContent = data.name;

    // OpenWeatherMap icon URL structure
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    // Temperature in Celsius (temp)
    temperatureElement.innerHTML = `${Math.round(
      data.main.temp
    )}<span>°C</span>`;
    descriptionElement.textContent = data.weather[0].description;

    // Wind speed in m/s (wind.speed)
    windSpeedElement.textContent = data.wind.speed;
    humidityElement.textContent = data.main.humidity;
  }

  function displayError(message) {
    weatherInfoDiv.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = message;
  }

  // Optional: Fetch weather for a default city on load
  // fetchWeatherData('Kathmandu');
});
