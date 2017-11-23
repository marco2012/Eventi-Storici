var express= require("express");
var app= express();
var https= require("https");
//pr gestire pagine di successo e errore
var fs= require("fs");
var path= require("path");

//Variabili server
var hostname= "localhost";
var port= 3000;

//Credenziali per l'autenticazione utilizzando OAuth2.0 di google
//Variabili per la gestione di Drive https://developers.google.com/identity/protocols/OAuth2WebServer#creatingclient
var client_id = "282478069354-segjrssj65eartbgvvn212iqftjbfivj.apps.googleusercontent.com"
var client_secret = "34cy0OjwgotDTtnFTkUOE0Hw"
var redirect_uri = "http://"+hostname+":"+port+"/oauth2callback"
//Scope https://developers.google.com/drive/v2/web/about-authhttps://developers.google.com/drive/v2/web/about-auths
var scope = "https://www.googleapis.com/auth/drive.file";                    //Per-file access to files created or opened by the app.
var listFiles = "https://www.googleapis.com/drive/v3/files";                 //Link alla lista dei file presenti in Drive

var oauthlink = "https://accounts.google.com/o/oauth2/auth?client_id="+client_id+"&response_type=code&redirect_uri="+redirect_uri+"&scope="+scope+"&access_type=online";

exports.getAccess = function(callback){

app.get("/", function(req,res){                                             //redirect per la gestione del grant dei permessi (authorization request phase)
  res.redirect(oauthlink);
});

app.get("/oauth2callback", function(req,res){

  //controllo errori
  if (req.query.error){                                                   //gestione errori(accesso negato)
    var errorHtml= path.resolve("./"+"/error.html");                    //restituisce il percorso completo di error.html presente nella stessa cartella
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream(errorHtml).pipe(res);
    console.log("\t"+"Access denied!!");                                //debug
    // res.send("RECEIVED ERROR " + req.query.error);
    return;
  }
  //ottengo codice autenticazione
  authCode = req.query.code;                                              //nella risposta al grant se non ci sono errori è presente l'authentication code all'interno di una query
  console.log("\t"+"Authentication Code obtained: "+authCode);            //debug

  //richiesta token
  var accessToken;
  var options = {
    hostname: "www.googleapis.com",
    port: 443,
    method: 'POST',
    path: "/oauth2/v4/token?code="+authCode+"&client_id="+client_id+"&client_secret="+client_secret+"&redirect_uri="+redirect_uri+"&grant_type=authorization_code"
  };
  var replyToken ="";
  var reqAccess = https.request(options, function(resStream){                 //connessione sicura verso l'authorization server di google (auth grant phase)
  resStream.setEncoding("utf8");
  resStream.on("data", function (pezzo) {
    replyToken += pezzo;
  });

  resStream.on("end", function () {
    replyToken=JSON.parse(replyToken);
    accessToken = replyToken.access_token;                              //ottenuto Access Token
    console.log("\t"+"Access Token obtained: "+accessToken); 	        //debug


    var successHtml= path.resolve("./"+"/success.html");              //apro un file html con l'esito positivo dell'autenticazone
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream(successHtml).pipe(res);


    // callback(accessToken);
  });
});

reqAccess.end();
});

app.listen(port, hostname, function(){
  console.log("Server running at: "+hostname+":"+port+"\n");
});

};
