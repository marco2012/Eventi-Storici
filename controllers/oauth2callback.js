var express = require("express")
var express = require("request")
var dpx_mw = require("../middlewares/dropbox")

var router = express.Router()

var url = "http://localhost:3000"

router.get("/", (req, res) => {
    if (req.query.error) res.send("Error occured while retrieving authorization code")
    var auth_code = req.query.code
    console.log(auth_code)
    request.post({
        url: 'https://api.dropboxapi.com/oauth2/token',
        qs: { //qery string, costruisce la stringa di richiesta con i parametris
            code: auth_code,
            grant_type: 'authorization_code',
            client_id: dpx_mw.getClientId(),
            client_secret: dpx_mw.getClientSecret(),
            redirect_uri: dpx_mw.getRedirectUrl()
        }
    }, (err, resp, body) => {
        if (err) res.send("Connection error")
        res.redirect(url + "?access_token=" + body.access_token)
    })
})

module.exports = router
