var request = require("request")

var url = "http://127.0.0.1:5984"

// Save a document
exports.save = function(done) {
    request.post({
        url: url + '/' + "prova",
        headers: {"Content-Type":"application/json"},
        body: {message: "Hello World"},
        json: true,
    })
}
