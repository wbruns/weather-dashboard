// my open weather api key
var apiKey = '4d78acdcd141fb66bc220ffe67b06fc4';
// obj for storage
var cities = {};
console.log(cities);

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
        // get longitude and latitude coordinates 
        var lon = openData.coord.lon;
        var lat = openData.coord.lat;
        // display city name
        console.log(openData.name);
        $('#city-name').html(openData.name);
        console.log(lon);
        console.log(lat);
        console.log(openData);
        // call the one call api
        var oneUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey;
        fetch(oneUrl).then(function(response) {
          response.json().then(function(oneData) {
            console.log(oneData);
            displayWeather(oneData);
          });
        });
      });
    });
  };
  // function for displaying weather info
  var displayWeather = function(oneData) {
    $("#current-temp").html(oneData.current.temp);
    $('#current-wind').html(oneData.current.wind_speed);
    $('#current-humidity').html(oneData.current.humidity);
    $('#current-uv').html(oneData.current.uvi);
    // put the data in our cities object to save
    var current = {
      temp: oneData.current.temp,
      wind_speed: oneData.current.wind_speed,
      humidity: oneData.current.humidity,
      uvi: oneData.current.uvi
    };
    $.extend(cities, current);
    console.log(current);
    console.log(cities);
    // array for daily forecast cards
    var dailyArray = $(".card-deck .card").toArray();
    // loop over and display info
    $.each(dailyArray, function(i) {
      $(this).find('.daily-temp').html(oneData.daily[i].temp.day);
      $(this).find('.daily-wind').html(oneData.daily[i].wind_speed);
      $(this).find('.daily-humidity').html(oneData.daily[i].humidity);
      $(this).find('.daily-uv').html(oneData.daily[i].uvi);
    })
  };
  // function for loading cities object from storage
  var loadCities = function() {
    cities = JSON.parse(localStorage.getItem('cities'));
    // if nothing in localStorage, recreate cities object with arrays for forecast time
    if (!cities) {
      cities = {
        current: {},
        daily: {}
      };
    }
    // loop over object
    // $.each(cities, function(list,arr) {
    //   // loop over sub-array
    //   arr.forEach(function())
    // })
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
});
