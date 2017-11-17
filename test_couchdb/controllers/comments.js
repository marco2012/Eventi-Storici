var express = require("express")
var router = express.Router()
var db = require("../db")

router.get("/", function(req, res) {
    res.send("Get inviata su localhost/comments")
})

//Il controller iteragisce con il databse in questo caso. Ciò va contro mcv , ma mi serviva un esempio veloce per capire
//come salvare documenti. L'interazione col databse andrebbe effettuata all'interno del modello opportuno.
router.post("/", function(req, res) {
    db.save()
})

module.exports = router
