// my open weather api key
var apiKey = '4d78acdcd141fb66bc220ffe67b06fc4';
// obj for storage
var cities = [];

// code wont run till dom is loaded
$(document).ready(function() {
  // function for getting weather info from open weather api
  var getWeather = function(city) {
    // format api url
    var cityName = city;
    var openUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;
    // call open weather api
    fetch(openUrl).then(function(response) {
      response.json().then(function(openData) {
        // get longitude, latitude coordinates and name
        var lon = openData.coord.lon;
        var lat = openData.coord.lat;
        var cityName = openData.name;
        
        // call the one call api
        var oneUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey;
        fetch(oneUrl).then(function(response) {
          response.json().then(function(oneData) {
            console.log(oneData);
            displayWeather(cityName, oneData);
          });
        });
      });
    });
  };
  // function for displaying weather info
  var displayWeather = function(cityName, oneData) {
    $('#city-name').html(cityName);
    $("#current-temp").html(oneData.current.temp);
    $('#current-wind').html(oneData.current.wind_speed);
    $('#current-humidity').html(oneData.current.humidity);
    $('#current-uv').html(oneData.current.uvi);
    // create list element for a city that's been searched and append it to page
    var cityLi = $("<li>").html(cityName);
    $('#city-list').append(cityLi);
    // put the data in our cities object to save
    var city = {
      "name": cityName,
      current: {
        temp: oneData.current.temp,
        wind_speed: oneData.current.wind_speed,
        humidity: oneData.current.humidity,
        uvi: oneData.current.uvi
      }
    };
    console.log(city);
    // array for daily forecast cards elements
    var dailyArray = $(".card-deck .card").toArray();
    // array for storing daily info
    var daily = [];
    // loop over and display info
    $.each(dailyArray, function(i) {
      $(this).find('.daily-temp').html(oneData.daily[i].temp.day);
      $(this).find('.daily-wind').html(oneData.daily[i].wind_speed);
      $(this).find('.daily-humidity').html(oneData.daily[i].humidity);
      $(this).find('.daily-uv').html(oneData.daily[i].uvi);
      // format the storage object array
      daily.push({
        temp: oneData.daily[i].temp.day,
        wind_speed: oneData.daily[i].wind_speed,
        humidity: oneData.daily[i].humidity,
        uvi: oneData.daily[i].uvi
      });
    });
    city.daily = daily;
    cities.push(city);
    saveCities();
  };
  // function for loading cities object from storage
  var loadCities = function() {
    // if nothing in localStorage, recreate cities array
    if (!cities) {
      cities = [];
    } else {
      cities = JSON.parse(localStorage.getItem('cities'));
    }
    console.log(cities);
    // loop over object
    $.each(cities, function(list,arr) {
      var name = this.name;
      console.log(name);
    })
  };
  var saveCities = function() {
    // put cities array in storage
    localStorage.setItem('cities', JSON.stringify(cities));
  };
  
  // city search button is clicked
  $('#city-search .btn').click(function() {
    // get the city name
    var cityName = $('#city').val().trim();
    if (cityName) {
      // clear input form
      $('#city').val('');
      getWeather(cityName);
    } else {
      alert('Please enter a City name');
    }
  });
  // prevent submit reload
  $('#city-search').on('submit', function(event) {
    event.preventDefault();
  });
  loadCities();
});
