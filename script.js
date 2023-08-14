var citySearch = document.getElementById('searchBar');
var searchBtn = document.getElementById('searchBtn');
var searchTerm = document.getElemenyById('searchTerm');
var searchResults = document.querySelector('#searchTerm');
var fiveDay = document.querySelector('#fiveDayDisplay');
var weatherDisplay = document.querySelector('#weatherDisplay');
var latitude = 33.448248;
var longitude = -112.121191;


function readCityStorage() {
    var city = localStorage.getItem('city');
    let cities = city === null ? [] : JSON.parse(city);
    return cities;
}
readCityStorage();

function getWeather(lat, lon) {
    var request = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=f71a0ffd0ff5f743a225eb896129f195'
    console.log(request);
    
    fetch(request)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Show current Day's weather
        })
}

function getCity(cityName) {
    var request = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=f71a0ffd0ff5f743a225eb896129f195'
    console.log(request);
    saveToStorage(cityName);

    fetch(request)
        .then (function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;

            // Get Weather
            getFiveDayForecast(lat, lon);
        })
}

function getFiveDayForecast(lat, lon) {
    var request = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=f71a0ffd0ff5f743a225eb896129f195';
    console.log(request)

    fetch(request)
        .then(function (response) {
            return response.json();
        })

}

function displayFiveDayForecast(weatherData) {
    var forecastArray = [];

    var forecastElement = document.getElementsByClassName('forecast');
    for (var i = 0; i < forecastElement.length; i++) {
        forecastElement[i].children[0].textContent = "Date: " + forecastArray[i].dt_txt;
        forecastElement[i].children[1].setAttribute('src', "https://openweathermap.org/img/wn/" + forecastArray[i].weather[0].icon + "@2x.png")
        forecastElement[i].children[2].textContent = "Temp: " + forecastArray[i].main.temp + "\u00b0";
        forecastElement[i].children[3].textContent = "Wind: " + forecastArray[i].wind.speed + "mph";
        forecastElement[i].children[4].textContent = "Humidity: " + forecastArray[i].main.humidity+ "%" ;
    }
    console.log(forecastArray);
}

searchBtn.addEventListener("click", function() {
    var searchBar = document.getElementById('searchBar');
    // code to actually show the results
    // code to reset search bar to empty
})