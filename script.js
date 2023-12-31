var citySearch = document.getElementById('searchBar');
var searchBtn = document.getElementById('searchBtn');
var searchTerm = document.getElementById('searchTerm');
var searchResults = document.getElementById('searchResults');
var searchList = JSON.parse(localStorage.getItem('city')) || [];
var fiveDay = document.querySelector('#fiveDayDisplay');
var weatherDisplay = document.querySelector('#weatherDisplay');
var latitude = 33.448248;
var longitude = -112.121191;

console.log(searchList)
function readLocalStorage() {
    var city = localStorage.getItem('city');
    console.log(city)
    let cities = city === null ? [] : JSON.parse(city);
    console.log(cities)
    return cities;
}

readLocalStorage();
loadSearch();
function getSearch(item) {
    getCity(item)
}

function loadSearch() {
    searchResults.innerHTML = "";
    for (var i = 0; i < Math.min(searchList.length, 8); i++) {
        var searchButton = $(`<button id="button-${i}" type="button"></button>`).text(searchList[i]).attr("onclick", "getSearch('" + searchList[i] + "')").appendTo(searchResults);
    }
}

function saveToLocalStorage(city) {
    var searchTerm = city;
    if(searchList.includes(searchTerm)) {
        return;
    }
    searchList.push(searchTerm);
    localStorage.setItem('city', JSON.stringify(searchList));
    getSearch(searchTerm);
    loadSearch();
}

function getWeather(lat, lon) {
    var request = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=3c46f7e5ae55c2618838b578d5c04d07&units=imperial'
    
    fetch(request)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data)
        })
}

function displayWeather(weatherData) {
    var cityName = document.getElementById('city');
    var image = document.getElementById('image');
    var temp = document.getElementById('temp');
    var wind = document.getElementById('wind');
    var humidity = document.getElementById('humidity');

    cityName.textContent = weatherData.name;
    image.setAttribute('src', "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png")
    temp.textContent = "Temp: " + weatherData.main.temp + "\u00b0"
    wind.textContent = "Wind: " + weatherData.wind.speed + "MPH"
    humidity.textContent = "Humidity: " + weatherData.main.humidity + "%"
}

function getCity(cityName) {
    var request = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=3c46f7e5ae55c2618838b578d5c04d07'
    saveToLocalStorage(cityName);

    fetch(request)
        .then (function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;

            getWeather(lat, lon);
            getFiveDayForecast(lat, lon);
        })
}

function getFiveDayForecast(lat, lon) {
    var request = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=3c46f7e5ae55c2618838b578d5c04d07&units=imperial';

    fetch(request)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayFiveDayForecast(data.list);
        })

}

function displayFiveDayForecast(weatherData) {
    var forecastArray = [];

    for (var i = 7; i < weatherData.length; i += 8) {
        forecastArray.push(weatherData[i]);
    }

    var forecastElement = document.getElementsByClassName('forecast');
    for (var i = 0; i < forecastElement.length; i++) {
        forecastElement[i].children[0].textContent = "Date: " + new Date(forecastArray[i].dt_txt).toLocaleDateString()
        forecastElement[i].children[1].setAttribute('src', "https://openweathermap.org/img/wn/" + forecastArray[i].weather[0].icon + "@2x.png")
        forecastElement[i].children[2].textContent = "Temp: " + forecastArray[i].main.temp + "\u00b0";
        forecastElement[i].children[3].textContent = "Wind: " + forecastArray[i].wind.speed + "mph";
        forecastElement[i].children[4].textContent = "Humidity: " + forecastArray[i].main.humidity+ "%" ;
    }
}

searchBtn.addEventListener("click", function() {
    var searchBar = document.getElementById('searchBar');
    getSearch(searchBar.value);
    searchBar.value = "";
})