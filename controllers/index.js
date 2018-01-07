//Questo è il controller "madre" che si avvvale di tutti gli altri controller per poter funzionare,
//cosi facendo è possibile lavorare su singoli controller senza alterare la funzionalità degli altri
var express = require("express")
var router  = express.Router()
var fs      = require("fs")
var path    = require('path')

var projectPath = path.resolve('.');

router.get("/", (req, res) => {
    var token = req.query.access_token
    if (!token) {
        console.log("[CONTROLLER][INDEX]     Avvio autenticazione")
        res.sendFile(projectPath + '/views/main_page.html');
    }
    else {
        console.log("[CONTROLLER][INDEX]     Carico pagina iniziale")
        res.sendFile(projectPath + '/views/index.html')
    }
})

router.use("/auth", require("./auth"))
router.use("/date", require("./date"))
router.use("/oauth2callback", require("./oauth2callback"))

module.exports = router
