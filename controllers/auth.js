var express = require("express")
var dpx_mw = require("../middlewares/dropbox")

var router = express.Router()

router.get("/", (req, res) => dpx.authenticate(res))

module.exports = router
