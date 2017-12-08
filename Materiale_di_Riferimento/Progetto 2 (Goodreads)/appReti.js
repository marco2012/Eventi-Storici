/*
In breve: appReti richiede all'utente i permessi per accedere a Drive tramite oauthG, scarica la lista dei file presenti
(in questo caso è importante, al fine di ottenere risultati consistenti, che siano presenti solo file che hanno per nome titoli di libri),
si connette a Goodreads, ottenendo la api key da apiGreads, e per ogni titolo scarica tutti dei metadati associati ad esso
(ad alcuni titoli possono corrispondere più libri).
Infine invia i dati appena ottenuti ad una coda gestita da rabbitmq.
codaFinal2 riceve i messaggi inviati da appReti tramite il broker di rabbitmq e per ogni libro crea un file xml contenente i suoi metadati.

Passaggio per passaggio:
1- Vengono avviati su due prompt dei comandi separati, codaFinal2 e appReti
2- appReti attiva il server chiamando oauthG.getAccess(callback).
3- L'utente inserisce localhost:3000 nel proprio browser per avviare il servizio rest.
	(Un modo più elegante di gestire questo passaggio consiste nel creare una propria pagina web con all'interno un pulsante per innescare
	autorizzazione dei permessi)
4- oauthG cattura la richiesta e ridirige l' utente alla maschera per la gestione dei permessi di google drive. Se l' utente non accetta
viene aperta una pagina html di errore(è possibile ritentare reimmettendo nel browser localhost:3000), se invece accetta viene aperta  una
pagina html che notifica l'esito positivo e prosegue con l'elaborazione.
5- Ottenuto l' authentication code oauthG apre una connessione verso l'authorization server di google e per scambiarlo con l'access token.
Ottenuto l'access token lo invia ad appReti.
6- appReti chiama getListDrive(accessToken, callback) che apre una connessione con il resource server di google drive(inviando l'access token) per ottenere la
lista dei file presenti in Drive.
7- appReti chiama apiGReads.getAccess(callback) per ottenere la apikey di Goodreads e per ogni file(titolo di un libro) presente nella lista chiama
getMetadati(apikeyGoodreads, title, callback), il quale apre una connessione con Goodreads per scaricare i metadati associati ad ogni titolo e li invia al broker di rabbitmq.
8- codaFinal2 riceve i metadati che vengono salvati all' interno di un file che ha per nome il titolo del libro e la data corrente.
*/

//Middlewares
var express= require("express");
var app= express();
var https= require("https");
var amqp= require("amqplib/callback_api");
//Middlewares custom
var oauthG= require("./oauthG");
var apiGReads= require("./apiGReads");

//Gestione Drive
var listFiles = "https://www.googleapis.com/drive/v3/files";

//Connessione al broker
var conn;                                                   				//currToStamp tiene il conto dei libri già inviati all'exchange
amqp.connect("amqp://localhost",function(err, sendConn){                   	//creo una sola connessione al broker per gestire i trasferimenti di dati
	conn= sendConn;                                                       	//le connessioni sono onerose, meglio aprire più canali su una singola connessione.
});

var currList=0, listSize;

//Hearth of the application
oauthG.getAccess(function (accessToken){                            //i metodi chiamati sono annidati per garantirne la sequenzialità e dunque il corretto funzionamento
	getListDrive(accessToken, function(data){
		apiGReads.getAccess(function (apikeyGood){
			//var keyword= "The Lucifer Effect: Understanding How Good People Turn Evil";    //debug1: inserisco il titolo manualmente per testare api rest Goodreads
			listSize= data.files.length;
			for(var i=0; i<listSize; i++){                                                   //debug1: commento il ciclo for e cleanStr
				var cleanStr= (data.files[i].name).replace(".txt", "");
				getMetadati(apikeyGood, cleanStr, function(meta){                            //debug1: passo keyword invece di cleanStr a getMetadati per eseguire il test
					sendToBroker(listSize+">"+meta, function (ok){                           //aggiungo ai metadati il numero di libri, questa informazione verrà estratta da codaFinal2 per determinare la ricezione di tutti i messaggi
						if(ok){
							currList=0;
							listSize=0;
							console.log("\n"+"\t"+"All the books were delivered to the exchange"+"\n");
						}
					});
				});
			};
		});
	});
});


//Funzione per accedere a Drive e restituire la lista come oggetto javascript
function getListDrive(accessToken, callback){
	var list="";
	var resource = https.get(listFiles +"?access_token="+ accessToken, function(res){           //accedo al rsource server con l'Access Token
		res.on("data", function (chunk) {
			list += chunk;
		});
		res.on("end", function () {
			//console.log("Lista File Drive: "+list);                                           //debug2: controllo lista file google drive
			list=JSON.parse(list);
			callback(list);
		});
	});
	resource.end();
};

//Funzione per accedere a Goodreads e restituire i metadati in formato xml
function getMetadati(api, kw, cb){

	var params= "https://www.goodreads.com/search.xml?key="+api+"&q="+kw;
	var metaData= "";
	var reqApi= https.get(params, function(resApi){
		resApi.setEncoding("utf8");
		resApi.on("data", function (chunk){
			metaData += chunk;
		});
		resApi.on("end", function (){
			//console.log("\t"+"Data received: "+metaData);                    //debug
			cb(kw+metaData);                                                   //aggiungo ai metadati il titolo del libro, questa informazione verrà estratta da codaFinal2 per creare il file(altrimenti sarebbe stato necessario fare il parsing dei metadati in formato xml)
		});
	});
	reqApi.end();
};

//Funzione che invia la lista al broker
function sendToBroker(data, alldone){
	conn.createChannel(function(err, chan){
		var endOfSize= data.indexOf(">");
		var endOfTitle= data.indexOf("<");
		var title= data.substring(endOfSize+1,endOfTitle);

		var exch = "appRetiExchange";
		chan.assertExchange(exch, "direct", {durable: true});                        //crea l' exchange di tipo direct se non esiste già
		chan.publish(exch, "bindingKey", new Buffer(JSON.stringify(data)));          //invia la lista al collegamento(bind) exchange-queue di nome bindingKey
		chan.close(function(){
			console.log("\t"+"Book: ["+title+"] delivered to the Exchange");         //debug
			currList++;
			if(currList== listSize) alldone(true);
			else alldone(false);
		});

	});
};
