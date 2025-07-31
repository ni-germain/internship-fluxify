const apiKey = "d727507fc1467e3b963947af38582535";
let tempUnit = "metric"; // "metric" for °C, "imperial" for °F
let savedCities = [];

// Elements
const cityInput = document.getElementById("cityInput");
const autocompleteList = document.getElementById("autocompleteList");
const searchBtn = document.getElementById("searchBtn");
const geoBtn = document.getElementById("geoBtn");
const currentCard = document.getElementById("currentCard");
const forecastCards = document.getElementById("forecastCards");
const alertsList = document.getElementById("alertsList");
const citiesList = document.getElementById("citiesList");
const tempToggleRadios = document.querySelectorAll('input[name="tempUnit"]');

// Sample cities for autocomplete (can be extended or replaced with API)
const citiesDB = ["Kigali","Nairobi","London","New York","Paris","Tokyo","Sydney","Moscow","Cairo","Rio de Janeiro"];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadSavedCities();
  attachEvents();
});

// Attach event listeners
function attachEvents() {
  searchBtn.addEventListener("click", () => searchCity(cityInput.value.trim()));
  geoBtn.addEventListener("click", getGeoLocation);
  cityInput.addEventListener("input", handleAutocomplete);
  tempToggleRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      tempUnit = document.querySelector('input[name="tempUnit"]:checked').value;
      if(savedCities.length) {
        searchCity(savedCities[savedCities.length-1]);
      }
    });
  });
  autocompleteList.addEventListener("click", e => {
    if(e.target.tagName === "LI") {
      cityInput.value = e.target.textContent;
      autocompleteList.style.display = "none";
    }
  });
  citiesList.addEventListener("click", e => {
    if(e.target.tagName === "LI") {
      searchCity(e.target.textContent);
    }
  });
}

// Load saved cities from localStorage
function loadSavedCities() {
  const stored = localStorage.getItem("savedCities");
  if(stored) {
    savedCities = JSON.parse(stored);
    updateSavedCitiesUI();
  }
}

// Save cities to localStorage
function saveCities() {
  localStorage.setItem("savedCities", JSON.stringify(savedCities));
}

// Update saved cities UI
function updateSavedCitiesUI() {
  citiesList.innerHTML = "";
  savedCities.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    citiesList.appendChild(li);
  });
}

// Handle autocomplete suggestions
function handleAutocomplete() {
  const val = cityInput.value.toLowerCase();
  if(!val) {
    autocompleteList.style.display = "none";
    return;
  }
  const matches = citiesDB.filter(city => city.toLowerCase().startsWith(val));
  if(matches.length === 0) {
    autocompleteList.style.display = "none";
    return;
  }
  autocompleteList.innerHTML = "";
  matches.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    autocompleteList.appendChild(li);
  });
  autocompleteList.style.display = "block";
}

// Search city weather data
async function searchCity(city) {
  if(!city) {
    alert("Please enter a city");
    return;
  }

  try {
    const currentData = await fetchWeather(city, tempUnit);
    displayCurrentWeather(currentData);

    const forecastData = await fetchForecast(city, tempUnit);
    displayForecast(forecastData);

    if(currentData.alerts) {
      displayAlerts(currentData.alerts);
    } else {
      alertsList.innerHTML = "<li>No weather alerts.</li>";
    }

    // Save city if not already saved
    if(!savedCities.includes(city)) {
      savedCities.push(city);
      saveCities();
      updateSavedCitiesUI();
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
}

// Fetch current weather
async function fetchWeather(city, units) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  const res = await fetch(url);
  if(!res.ok) throw new Error("City not found");
  return await res.json();
}

// Fetch 5-day forecast
async function fetchForecast(city, units) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  const res = await fetch(url);
  if(!res.ok) throw new Error("Forecast not found");
  return await res.json();
}

// Display current weather
function displayCurrentWeather(data) {
  currentCard.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="${data.weather[0].description}" />
    <div class="weather-info">
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>${capitalize(data.weather[0].description)}</p>
      <p>Temperature: ${data.main.temp.toFixed(1)}°${tempUnit === "metric" ? "C" : "F"}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} ${tempUnit === "metric" ? "m/s" : "mph"}</p>
    </div>
  `;
}

// Display 5-day forecast (grouped by day)
function displayForecast(data) {
  forecastCards.innerHTML = "";
  // Group forecast by date
  const dailyData = {};
  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if(!dailyData[date]) dailyData[date] = [];
    dailyData[date].push(item);
  });

  Object.keys(dailyData).slice(0,5).forEach(date => {
    // Take midday data for icon and temps
    const dayItems = dailyData[date];
    const midday = dayItems[Math.floor(dayItems.length / 2)];

    const icon = midday.weather[0].icon;
    const desc = midday.weather[0].description;
    const tempMin = Math.min(...dayItems.map(i => i.main.temp_min));
    const tempMax = Math.max(...dayItems.map(i => i.main.temp_max));

    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <h4>${formatDate(date)}</h4>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
      <p>${capitalize(desc)}</p>
      <p>Min: ${tempMin.toFixed(1)}°${tempUnit === "metric" ? "C" : "F"}</p>
      <p>Max: ${tempMax.toFixed(1)}°${tempUnit === "metric" ? "C" : "F"}</p>
    `;
    forecastCards.appendChild(card);
  });
}

// Display weather alerts
function displayAlerts(alerts) {
  alertsList.innerHTML = "";
  alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = `${alert.event} (${formatDate(alert.start * 1000)} - ${formatDate(alert.end * 1000)})`;
    alertsList.appendChild(li);
    // Optionally trigger notification
    notifyUser(`Weather Alert: ${alert.event}`);
  });
}

// Notify user (browser notification)
function notifyUser(message) {
  if(!("Notification" in window)) return;
  if(Notification.permission === "granted") {
    new Notification(message);
  } else if(Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if(permission === "granted") new Notification(message);
    });
  }
}

// Geolocation support
function getGeoLocation() {
  if(!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${tempUnit}&appid=${apiKey}`;
      const res = await fetch(url);
      if(!res.ok) throw new Error("Location weather not found");
      const data = await res.json();
      displayCurrentWeather(data);

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${tempUnit}&appid=${apiKey}`;
      const forecastRes = await fetch(forecastUrl);
      if(!forecastRes.ok) throw new Error("Location forecast not found");
      const forecastData = await forecastRes.json();
      displayForecast(forecastData);

      alertsList.innerHTML = "<li>No weather alerts.</li>";

      // Save city by name from data
      if(data.name && !savedCities.includes(data.name)) {
        savedCities.push(data.name);
        saveCities();
        updateSavedCitiesUI();
      }

    } catch(err) {
      alert(err.message);
    }
  }, () => {
    alert("Unable to retrieve your location");
  });
}

// Helpers
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateStr) {
  const options = { weekday: "short", month: "short", day: "numeric" };
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, options);
}
