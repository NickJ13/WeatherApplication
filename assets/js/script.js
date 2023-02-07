var form = document.querySelector('form');
var cityInput = document.querySelector('#search-city');
var currentWeather = document.querySelector('#weather-section');
var forecast = document.querySelector('#weather-forecast');
var searchHistory = document.querySelector('#search-history');
var dateElement = document.querySelector('#date');
var weatherIcon = document.querySelector('#weather-icon');

form.addEventListener('submit', event => {
    event.preventDefault();
});

//get the input element
var city = cityInput.value;

// Fetch the weather data from the API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=814f38345e9ad4aba13f50f7224ec9bc`)
    .then(response => response.json())
    .then(data => {
      var date = new Date(data.dt * 1000);
      var dateString = date.toLocaleDateString();
    });