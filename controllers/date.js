
var express = require("express")
var router = express.Router()
var data = require("../models/date")

router.get("/", function(req, res) {
    var date = req.split("/")[]
    data.insert("Hello World", function(err, doc) {
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
