
var express = require("express")
var date_mw = require("../middlewares/date")

var router = express.Router()

<<<<<<< HEAD
router.get("/", (req, res) => {
    //Qui va inserita la logica del controller
    //All'arrivo della get viene passato il controllo al middleware che si occupa del Reperimento dei dati
    //Quindi prima l'interrogazione del database e in caso la chiamata all'API muffinlabs(Francesco)
    //Parte il middleware che si occupa dell'autenticazione Oauth(Marco).
    //In seguito viene chiamato un altro middleware che si occupa della gestione del file su Google drive(
    //La parte di Aldo e Francesca rispettivamente per scrittura del file e API youtube)
=======
router.get("/", function(req, res) {
    var date = (req.path.split("/"))[1].replace(/-/, " ")  //è piu comodo scrivere la data in formato <Mese>-<Giorno>
    date.search(date, function(err, doc){
        if (err == -1) {
            //chiamata all'api che ci fornisce il documento

            //http.get({
                url: "http://history.muffinlabs.com/date/"
            })



            
            //chiamata allo scrittore tramite rabbitMQ
            //Scrittura sul drive del file
        }
        else if (err == null) {
            //Scrittura sul drive del file, gia presente nel database
        }
>>>>>>> d0b3cab... Mavaffanculo!!
    })
