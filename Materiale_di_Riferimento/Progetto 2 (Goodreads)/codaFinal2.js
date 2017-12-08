
//codaFinal2 riceve i metadati da appReti e per ogni libro crea un file xml con il titolo e la data corrente.
//Per ogni messaggio ricevuto viene inviato un ack al broker.
//All'interno di ogni file sono salvati i metadati associati al libro ricevuto.
//Se viene ricevuto lo stesso titolo più volte nello stesso minuto il file viene sovrascritto.

//Middlewares
var amqp = require("amqplib/callback_api");
var fs = require("fs");

var conn, chan, listSize=0, currList=0;

amqp.connect('amqp://localhost', function(err, connRes) {
	conn= connRes;
	conn.createChannel(function(err, chanRes) {
		chan= chanRes;
		
		//Definizione Exchange
		var exch = "appRetiExchange";
		chan.assertExchange(exch, "direct", {durable: true});

		//Bind alla coda per la ricezione della lista
		var queue= "appRetiQueue";
		chan.assertQueue(queue, {durable: true}, function(err, ok) {
			chan.bindQueue(queue, exch, "bindingKey");
			console.log("\t"+"Waiting for messages."+"\n");
			chan.consume(queue, function (msg){                                          //crea un consumer per la coda creata
				var raw = JSON.parse(msg.content.toString());
				
				var endOfSize= raw.indexOf(">");
				var endOfTitle= raw.indexOf("<");
				listSize= raw.substring(0,endOfSize);                                    //estrazione del numero totale dei libri
				var title= raw.substring(endOfSize+1,endOfTitle);                        //estrazione titolo libro, sua cancellazione e ripristino metadati
				raw= raw.substring(endOfTitle, raw.length);
		
				var date= new Date();
				var mese= currentDate(date.getMonth()+1),
					giorno= currentDate(date.getDate()),
					ore= currentDate(date.getHours()),
					minuti= currentDate(date.getMinutes());
				var strData= "" +date.getFullYear() +"-"+mese +"-"+giorno +" ("+ore +":"+minuti+")";         //crea stringa data formato: "aaaa-mm-gg (hh:mm)"
				var strDataToSave= "" +date.getFullYear() +"-"+mese +"-"+giorno +" ("+ore +"_"+minuti+")";   //a windows non piacciono i 2 punti
		
				fs.writeFile("./[Book] "+title+" of "+strDataToSave+".xml", raw, function (err) {            //salvataggio file xml
					if (err) return console.log(err);
					console.log("\t"+"Book: ["+title+"] metadata saved: "+strData);                          //debug
					currList++;
					if(currList== listSize){
						currList=0;
						listSize=0;
						console.log("\n"+"\t"+"All the books were saved correctly!"+"\n");
					}
				});
			},{noAck: true});              
		});
	});
});

//funzioni di supporto
function currentDate(value){
	return (value<10)? "0"+value : value;
}
