var express = require('express');
var https = require('https');
var app= express();
var porta= 3000;
var client_id_web = "713397933100-hor26bejvearof9ld6lnmmo53tfkf0l9.apps.googleusercontent.com";
var client_secret_web = "lVN26TNZP9AfkL0eVuG_zVba";

//APPLICAZIONE CHE MOSTRA IL NUMERO DI MESSAGGI DI GMAIL

var scope = "https://mail.google.com/"; // GMAIL
var list_oper = "https://www.googleapis.com/gmail/v1/users/me/profile";

//OAUTHLINK
var oauthlink = "https://accounts.google.com/o/oauth2/auth?client_id="+client_id_web+"&response_type=code&redirect_uri=http://localhost:3000/oauthcallback&scope="+scope+"&access_type=online";

app.get('/', function(req, res){
  res.redirect(oauthlink);
});

app.get('/oauthcallback', function(req, res){
  
  //Ricezione code
  if (req.query.error)
    res.send("RECEIVED ERROR " + req.query.error)
  if (!req.query.code)
    res.send("NO CODE");
  code = req.query.code;
  
  //Richiesta token
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
        res.send("NUMERO DI MESSAGGI DEL TUO GMAIL:\n" + JSON.stringify(dati));
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
      console.log(finalrisp);
      callback(finalrisp);
    });
  });
  file.end();
};
