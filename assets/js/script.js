// my open weather api key
var apiKey = '4d78acdcd141fb66bc220ffe67b06fc4';

// function for getting weather info from open weather api
var getWeather = function(city) {
  // format api url
  var cityName = city;
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;
  // call open weather api
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
};



// code wont run till dom is loaded
$(document).ready(function() {
  // city search button is clicked
  $('#city-search .btn').click(function() {
    // get the city name
    var cityName = $('#city').val().trim();
    console.log(cityName);
    if (cityName) {
      // clear input form
      $('#city').val('');
      getWeather(cityName);
    } else {
      alert('Please enter a City name');
    }
    
  });
});
