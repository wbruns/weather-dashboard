// my open weather api key
var apiKey = '4d78acdcd141fb66bc220ffe67b06fc4';


https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


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
        var oneUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=' + apiKey;
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
