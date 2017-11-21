var request = require('request');

/*
var options = {
  url: 'https://api.github.com/repos/request/request',
  headers: {
    'User-Agent': 'request'
  }
};
*/

var options = {
  url: 'http://api.openweathermap.org/data/2.5/weather?q=Roma,IT&units=metric&APPID=cdcc43f188d9a63e00471c9b6b45cada'
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log("###############################");
    console.log(info);
    console.log("###############################");
    console.log(info.coord);
    console.log("###############################");
    console.log(info.coord.lon);
    console.log("###############################");
    console.log(info.coord.lat);
    console.log("###############################");
    console.log(info.main.temp_min);
    console.log("###############################");

    // ********************************************************

    request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+info.coord.lat+','+info.coord.lon+'&radius=500&types=food&key=AIzaSyAPVWnsyoIJ30JraxrqCR5HXt5UWu6Z0XE', function optionalCallback(err, httpResponse, body) {

        //console.log(body);

    });

    // ********************************************************
  }
}

request.get(options, callback);
