
var express = require("express")
var router = express.Router()
var data = require("../models/date")

router.get("/", function(req, res) {
    var date = (req.path.split("/"))[1].replace(/-/, " ")  //è piu comodo scrivere la data in formato <Mese>-<Giorno>
    date.search(date, function(err, doc){
        if (err == -1) {
            //chiamata all'api che ci fornisce il documento
            //chiamata allo scrittore tramite rabbitMQ
            //Scrittura sul drive del file
        }
        else if (err == null) {
            //Scrittura sul drive del file, gia presente nel database
        }
    })
})
