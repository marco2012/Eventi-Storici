
//oauthG gestisce i permessi relativi all'accesso a google drive ed invia ad appReti l'access token ricevuto dall'authorization server di google
//tramite l'unica funzione che esporta getAccess(callback)

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
var client_id_google = "197138064734-ekbuoscmu3rki6ai06llgi0ot9qshluh.apps.googleusercontent.com";//"Client_ID api rest oauth2.0 google";
var client_secret_google = "EtTgVcjpZU5JWtcqJvnK14ek";                                            //"Client_secret api rest oauth2.0 google";

//Variabili per la gestione di Drive
var scope = "https://www.googleapis.com/auth/drive.readonly";                    //Permessi garantiti su Drive(solo accesso a metadati)
var listFiles = "https://www.googleapis.com/drive/v3/files";                     //Link alla lista dei file presenti in Drive
var oauthlink = "https://accounts.google.com/o/oauth2/auth?client_id="+client_id_google+"&response_type=code&redirect_uri=http://localhost:3000/oauth2callback&scope="+scope+"&access_type=online";

var data;
exports.getAccess= function(callback){

	app.get("/", function(req,res){                                             //redirect per la gestione del grant dei permessi (authorization request phase)
		res.redirect(oauthlink);
	});

	app.get("/oauth2callback", function(req,res){
		if (req.query.error){                                                   //gestione errori(accesso negato)
			var errorHtml= path.resolve("./"+"/error.html");                    //restituisce il percorso completo di error.html presente nella stessa cartella di oauthG
			res.writeHead(200, {"Content-Type": "text/html"});
			fs.createReadStream(errorHtml).pipe(res);
			console.log("\t"+"Access denied!!");                                //debug
			return;
		}

		authCode = req.query.code;                                              //nella risposta al grant se non ci sono errori è presente l'authentication code all'interno di una query
		//console.log("\t"+"Authentication Code obtained: "+authCode);          \//debug

		var accessToken;
		var options = {
			hostname: "www.googleapis.com",
			port: 443,
			method: 'POST',
			path: "/oauth2/v4/token?code="+authCode+"&client_id="+client_id_google+"&client_secret="+client_secret_google+"&redirect_uri=http://localhost:3000/oauth2callback&grant_type=authorization_code"
		};

		var replyToken ="";
		var reqAccess = https.request(options, function(resStream){                 //connessione sicura verso l'authorization server di google (auth grant phase)
			resStream.setEncoding("utf8");
			resStream.on("data", function (chunk) {
				replyToken += chunk;
			});

			resStream.on("end", function () {
				replyToken=JSON.parse(replyToken);
				accessToken = replyToken.access_token;                              //ottenuto Access Token
				//console.log("\t"+"Access Token obtained: "+accessToken); 	        //debug

				var successHtml= path.resolve("./"+"/success.html");              //oauthG apre un file html con l'esito positivo dell'autenticazone
				res.writeHead(200, {"Content-Type": "text/html"});
				fs.createReadStream(successHtml).pipe(res);
				callback(accessToken);
			});
		});
		reqAccess.end();
	});

	app.listen(port, hostname, function(){
		console.log("\t"+"Server running at: "+hostname+":"+port+"\n");
	});
};
