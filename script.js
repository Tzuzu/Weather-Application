var citySearch = document.getElementById('searchBar');
var searchBtn = document.getElementById('searchBtn');
var searchTerm = document.getElemenyById('searchTerm');
var searchResults = document.querySelector('#searchTerm');
var fiveDay = document.querySelector('#fiveDayDisplay');
var weatherDisplay = document.querySelector('#weatherDisplay');
var latitude = 33.448248;
var longitude = -112.121191;

function getCity(cityName) {
    var request = 'api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=f71a0ffd0ff5f743a225eb896129f195'
    console.log(request);
    saveToStorage(cityName);

    fetch(request)
        
}