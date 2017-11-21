var express = require('express');
var request = require('request');
var bodyParser = require("body-parser");

var app = express();
var a_t = ''; //autorization token
app.use(bodyParser.urlencoded({ extended: false }));

var CLIENT_ID = "713397933100-hor26bejvearof9ld6lnmmo53tfkf0l9.apps.googleusercontent.com";
var CLIENT_SECRET = "lVN26TNZP9AfkL0eVuG_zVba";
var PORT = 3000;


//https://developers.google.com/identity/protocols/OAuth2WebServer#creatingclient
app.get('/login', function(req, res){
	res.redirect("https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar&response_type=code&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http%3A%2F%2Flocalhost:"+PORT+"&client_id="+CLIENT_ID);
});

app.get('/', function(req, res){
	console.log("code taken");
  // res.send('the access token is: ' + req.query.code);

  var formData = {
  	code: req.query.code,
  	client_id: CLIENT_ID,
  	client_secret: CLIENT_SECRET,
  	redirect_uri: 'http://localhost:'+PORT,
  	grant_type: 'authorization_code'
  }


  request.post({url:'https://www.googleapis.com/oauth2/v4/token', form: formData}, 
  	function optionalCallback(err, httpResponse, body) {
  		
  		if (err) {
  			return console.error('upload failed:', err);
  		}

  		//stampa sul terminale
  		console.log('Upload successful!  Server responded with:', body);
  		var info = JSON.parse(body);

  		a_t = info.access_token;

  		//stampa nel browser
  		res.send("Got the token "+ a_t);
  	});

});

// curl -i -H "Authorization: Bearer ya29.GlvvBJnL8yvPkPNAC16hd7C63jTUcECwDJPy5YQ--oIrT8FdQsvFQNpmnEz2zf0K_YlADV8QWOsuYLobYwzG-d03gzAuvohEA95Jaj2vtWa02pPbzyBpwrrxH-vw" "https://www.googleapis.com/calendar/v3/users/me/calendarList"

app.get('/use_token', function(req, res){
	var options = {
		url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
		headers: {
			'Authorization': 'Bearer '+a_t
		}
	};
	request(options, function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			console.log(info);
			res.send(info);
		}
		else {
			console.log(error);
		}
	});

});


app.listen(PORT);
