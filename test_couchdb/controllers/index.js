var express = require("express")
var router = express.Router()

//Questo file è il controller che smista il controllo dei vari router definiti all'interno della cartella
router.use("/comments", require("./comments"))

module.exports = router
