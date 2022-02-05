var apiKey = '4d78acdcd141fb66bc220ffe67b06fc4';
var cityName = 'Tulsa';



var getWeather = function() {
  // format api url
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;
  // call open weather api
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
  
};

getWeather();