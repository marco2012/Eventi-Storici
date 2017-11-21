//Middlewares
var express= require("express");
var app= express();
var https= require("https");
var fs= require("fs");
var path= require("path");

//Variabili server
var hostname= "localhost";
var port= 3000;

//Credenziali per l'autenticazione utilizzando OAuth2.0 di google
var cliend_id = "282478069354-segjrssj65eartbgvvn212iqftjbfivj.apps.googleusercontent.com"
var client_secret = "34cy0OjwgotDTtnFTkUOE0Hw"

//Variabili per la gestione di Drive
var scope = "https://www.googleapis.com/auth/drive.readonly";                    //Permessi garantiti su Drive(solo accesso a metadati)
var listFiles = "https://www.googleapis.com/drive/v3/files";                     //Link alla lista dei file presenti in Drive
var oauthlink = "https://accounts.google.com/o/oauth2/auth?client_id="+cliend_id+"&response_type=code&redirect_uri=http://"+hostname+":"+port+"/oauth2callback&scope="+scope+"&access_type=online";


app.get("/", function(req,res){                                             //redirect per la gestione del grant dei permessi (authorization request phase)
  res.redirect(oauthlink);
});
