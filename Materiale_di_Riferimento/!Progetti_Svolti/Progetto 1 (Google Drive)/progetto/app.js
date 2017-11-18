var express = require('express');
var https = require('https');
var amqp = require('amqplib/callback_api');
var conn;
amqp.connect('amqp://localhost',function(err, newconn){
	conn=newconn;
});
var ex = 'exchange_rc';
var app= express();
var porta= 3000;
var client_id_web = "->->-> inserire qua i vostri dati <-<-<-";
var client_secret_web = "->->-> inserire qua i vostri dati <-<-<-";

//IL PROGETTO CONSISTE DI 2 APPLICAZIONI
//app.js LEGGE LA LISTA FILE DI UN ACCOUNT GOOGLE DRIVE E LA INVIA A rabbitcoda.js VIA RABBITMQ
//rabbitcoda.js RICEVE LA LISTA E LA SALVA IN UN FILE(IN FORMATO JSON)

var scope = "https://www.googleapis.com/auth/drive"; //GOOGLE DRIVE
var list_oper = "https://www.googleapis.com/drive/v3/files"; //LISTA DI FILE

//OAUTHLINK
var oauthlink = "https://accounts.google.com/o/oauth2/auth?client_id="+client_id_web+"&response_type=code&redirect_uri=http://localhost:3000/oauthcallback&scope="+scope+"&access_type=online";

app.get('/', function(req, res){
	res.redirect(oauthlink);
});

app.get('/oauthcallback', function(req, res){
  //Ricezione code
  if (req.query.error)
  	res.send("RECEIVED ERROR " + req.query.error);
  if (!req.query.code)
  	res.send("NO CODE");
  code = req.query.code;
  //res.send("OK, CODE RECEIVED: " + code);
  //RIchiesta token
  var risposta ="";
  var token;
  var options = {
  	hostname: "www.googleapis.com",
  	port: 443,
  	method: 'POST',
  	path: "/oauth2/v4/token?code="+code+"&client_id="+client_id_web+"&client_secret="+client_secret_web+"&redirect_uri=http://localhost:3000/oauthcallback&grant_type=authorization_code"
  };
  var reqtoken = https.request(options, function(restoken){
  	restoken.setEncoding("utf8");
  	restoken.on("data", function (pezzo) {
  		risposta += pezzo;
  	});
  	restoken.on("end", function () {
  		risposta=JSON.parse(risposta);
  		token = risposta.access_token;

      //console.log(token);
      leggiDatiDrive(token, function(dati){
      	res.setHeader('Content-Type', 'application/json');
      	conn.createChannel(function(err, ch) {
      		ch.assertExchange(ex, 'direct', {durable: true});
      		ch.publish(ex, 'bindkey', new Buffer(JSON.stringify(dati)));
      		console.log("Inviato all'exchange");
      		ch.close();
      	});
      	res.send("JSON CON DATI MEMORIZZATO!!");
      	console.log("Risposta inviata");
      });

  });
  });
  reqtoken.end();
});

app.listen(porta);
console.log('Il server è in funzione sulla porta ' + porta);

function leggiDatiDrive(token, callback){
	var finalrisp="";
	var file = https.get(list_oper + "?access_token=" + token, function(res){
		res.on("data", function (pezzo) {
			finalrisp += pezzo;
		});
		res.on("end", function () {
			finalrisp=JSON.parse(finalrisp);
			callback(finalrisp);
		});
	});
	file.end();
};
