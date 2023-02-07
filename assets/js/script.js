var form = document.querySelector('form');
var cityInput = document.querySelector('#search-city');
var currentWeather = document.querySelector('#weather-section');
var forecast = document.querySelector('#weather-forecast');
var searchHistory = document.querySelector('#search-history');
var dateElement = document.querySelector('#date');
var weatherIcon = document.querySelector('#weather-icon');

form.addEventListener('submit', event => {
    event.preventDefault();


//get the input element
var city = cityInput.value;

// Fetch the weather data from the API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=814f38345e9ad4aba13f50f7224ec9bc&units=imperial`)
    .then(response => response.json())
    .then(data => {
      var date = new Date(data.dt * 1000);
      var dateString = date.toLocaleDateString();
      
      
      // Update the page with current weather data
      document.querySelector('#city-name').innerText = data.name;
      dateElement.innerText = dateString;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.querySelector('#temperature').innerText = data.main.temp + '°f';
      document.querySelector('#humidity').innerText = data.main.humidity;
      document.querySelector('#wind-speed').innerText = data.wind.speed;
      getForecast(city);
    });

    // create function for 5-day forecast
  var apiKey = '814f38345e9ad4aba13f50f7224ec9bc';

  function getForecast(city) {
    forecast.innerHTML = '';
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
        // create a loop to get the forecast for the next 5 days
        data.list.filter((forecastData, index, arr) => {
          return new Date(forecastData.dt_txt).toDateString() !== new Date(arr[index - 1]?.dt_txt).toDateString();
        }).forEach(forecastData => {
      
            //  Get date and time of forecast
            var dateTime = forecastData.dt_txt;
            //  get temp
            var temperature = forecastData.main.temp + '°f';
            //get conditions
            var condition = forecastData.weather[0].main;
            //get humdity
            var humidity = forecastData.main.humidity + '%';
            //get windspeed
            var windSpeed = forecastData.wind.speed + ' m/s';
            
            var forecastDay = document.createElement('div');
            forecastDay.classList.add('day-forecast');
            forecastDay.innerHTML = `
                <p>Date: ${dateTime}</p>
                <img src="https://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png" alt="Weather Icon">
                <p>Temperature: ${temperature}</p>
                <p>Condition: ${condition}</p>
                <p>Humidity: ${humidity}</p>
                <p>Wind Speed: ${windSpeed}</p>
            `;
            forecast.appendChild(forecastDay);
        });
    })
    .catch(error => {
        console.log("Error fetching data", error);
    });
}
const cityListItem = document.createElement('li');
cityListItem.innerText = city;
searchHistory.appendChild(cityListItem);
var deleteButton = document.createElement("button");
deleteButton.innerHTML = "x";
cityListItem.appendChild(deleteButton);
deleteButton.addEventListener("click", function() {
  searchHistory.removeChild(cityListItem);
});
});



