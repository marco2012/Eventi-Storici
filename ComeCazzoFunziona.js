var express = require('express')
var app = express();

var options = {
  url: 'http://history.muffinlabs.com/date/2/14'
}
var anno;
var testo;
var cod;
var coll;


var data = {
    "event" [

        {   "year" : anno
            "text" : testo
            "html" : cod
            "links" : coll
        }
    ]
}

app.get('February 14', function(req, res){
    res.send(data.event.value);
})

app.get('options', function(req,res){
  var temp = data.event.year;
  console.log(temp);
});
