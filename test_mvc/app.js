//Ho provato a simulare un app che gestice utenti e commenti, piu che altro per capire come interagire un po meglio con couchdb
//Per farla funzionare inserite due documenti a piacere su couchdb con id  "7eefa40a3b33cbfc888ab25370013d89" e "7eefa40a3b33cbfc888ab25370010a2a"
//Ovviamente l'app fa schifo perche non manda risposte, quindi il browser non è reattivo,tuttavia  sono riuscito a estrapolare dati dal database,non rimane che capire come restituirli
//in maniera piu decente


var express = require('express')
  , app = express()

app.use(require('./controllers'))

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})
