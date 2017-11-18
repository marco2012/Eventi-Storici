//Con questo controller si gestiscono le richieste post su comments/new e le get su comments/search, per l'esempio iniziale ho inserito i dati gia dentro il codice per semplicita.
//Il controler richiede per forza l'interazione con il modello.
//Purtroppo la risposta del controller dopo l'interazione col database non sono ancora riuscito a capire come funziona, quindi per ora il risultato della chiamata
//l'ho loggato sulla console, il controler per l'user è identico

var express = require("express"),
    router = express.Router(),
    comments = require("../Models/comment")

router.post("/new", function(res, req) {
    comments.insert("Hello World", function(err, doc) {
        console.log(doc)
    })
})

//Per farla funzionare ho inserito un documento nel databse e ho preso il suo id, ovviamente per poterla rendere utile dovremmo cercare un modo di identidicare l'oggetto,
//e credo che si facia nel front end
router.get("/search", function(res, req) {
    comments.getById("7eefa40a3b33cbfc888ab25370010a2a", function(err, doc) {
        console.log(doc)
    })
})

module.exports = router
