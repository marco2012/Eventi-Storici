var express = require("express")
var app = express()

app.use(require("./controllers"))

app.listen(3000, function() {
    console.log("listening on port 3000")
})

//IL test fatelo da terminale con
// curl -X POST http://127.0.0.1:3000/comments
