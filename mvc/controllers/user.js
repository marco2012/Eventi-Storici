var express = require("express")
var router = express.Router()
var db = require("../db")

//Attraverso la post su localhost/user viene chiamata la funzione save(che in teoria andrebbe gestita dal modello, ma che non ho
//ancora visto
router.post("/", function(req, res){
    db.save()
})

module.exports = router
