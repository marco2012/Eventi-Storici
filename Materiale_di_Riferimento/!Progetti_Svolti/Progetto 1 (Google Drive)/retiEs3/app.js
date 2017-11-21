var getTraduzione = require('./getTraduzione');
var express = require('express');
var app= express();
var porta= 3000;

/* MESSAGGIO TIPO DI RISPOSTA IN CASO DI SUCCESSO
{
  "data": {
    "translations": [
      {
        "translatedText": "cane"
      }
    ]
  }
}
*/

//Applicazione che raduce "parola" in italiano
//Esempio chiamata:         curl localhost:3000?parola=dog

app.get('/', function(req, res) {
  if (!req.query.parola)
    res.send("NESSUNA PAROLA INSERITA - esempio richiesta: localhost:3000?parola=dog");
    else{
      parola=req.query.parola;
      console.log("traduzione " + parola);

      getTraduzione(parola, function(risposta){
        console.log("risposta inviata");
        res.send(risposta);
        //res.send(risposta.data.translations[0].translatedText);
      });
      
    };
});
app.listen(3000);
console.log('Il server è in funzione sulla porta ' + porta);
