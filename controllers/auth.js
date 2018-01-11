const express = require("express")
const dpx_mw = require("../middlewares/dropbox")

const router = express.Router()

router.get("/", (req, res) => dpx_mw.authenticate(res))

module.exports = router
