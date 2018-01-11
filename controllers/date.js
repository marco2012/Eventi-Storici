const path         = require('path');
const express      = require("express")
const router       = express.Router()

const helper       = require("../helpers/helper")
const date         = require("../models/date")
const dpx_mw       = require("../middlewares/dropbox")
const twitter_mw   = require("../middlewares/twitter")
const telegram_mw  = require("../middlewares/telegram")
const get_links_mw = require("../middlewares/get_links")
const amqp_mw      = require("../middlewares/amqp")
const ws           = require('../middlewares/ws')

router.get("/*", (req, res) => {
    var token = req.query.access_token
    var data = req.path //ad esempio /12/1

    //redirect alla pagina che mostra il log degli eventi tramite websocket
    res.sendFile(path.resolve('.') + '/views/success.html')

    date.search(data, (result, doc) => {

        console.log('[CONTROLLER][DATE]      ' + helper.resolveStatusCode(result)); //stampa il significato del codice restituito dalla ricerca
        ws.send('[CONTROLLER][DATE]      ' + helper.resolveStatusCode(result)); //stampa il significato del codice restituito dalla ricerca

        //errore connessioe
        if (result == -2) res.send("Connection error")

        //doc non presente in couchdb e lo inserisco con rabbitMQ
        if (result == -1) amqp_mw.send(doc)

        //l'evento sta nel database
        //cerca i link una sola volta e li da a twitter e telegram
        get_links_mw.getLinks(doc, function(i, youtube_link, image_url, description){
            telegram_mw.telegram(doc, i, youtube_link, image_url, description)
            twitter_mw.tweet(doc, i, youtube_link, image_url, description)
        })

        // scrive eventi sul file e li carica su Dropbox
        dpx_mw.upload(doc, token)

    })
})

module.exports = router
