const express   = require("express")
const request   = require("request")
const dpx_mw    = require("../middlewares/dropbox")

const router    = express.Router()

const url       = "http://localhost:3000"

router.get("/", (req, res) => {
    if (req.query.error) res.send("Error occured while retrieving authorization code")

    var auth_code = req.query.code
    console.log('[CONTROLLER][OAUTH2CALLBACK] Authorization Code ottenuto: '+auth_code);

    request.post(
        {
            url: 'https://api.dropboxapi.com/oauth2/token',
            qs: { //query string, costruisce la stringa di richiesta con i parametri
                code:           auth_code,
                grant_type:     'authorization_code',
                client_id:      dpx_mw.getClientId(),
                client_secret:  dpx_mw.getClientSecret(),
                redirect_uri:   dpx_mw.getRedirectUrl()
            }
        }, (err, resp, body) => {
            if (err) res.send("Connection error")
            var obj = JSON.parse(body)
            var token = obj.access_token
            console.log('[CONTROLLER][OAUTH2CALLBACK] Token ottenuto: '+token);
            res.redirect(url + "?access_token=%22" + token + "%22")
        })
})

module.exports = router
