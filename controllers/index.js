//Questo è il controller "madre" che si avvvale di tutti gli altri controller per poter funzionare, cosi facendo è possibile lavorare su singoli controller senza alterare la
//funzionalità degli altri


var express = require("express"),
    router = express.Router()

router.use("/date", require("./date"))

module.exports = router
