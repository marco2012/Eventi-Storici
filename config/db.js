//File per la gestione di CouchDB.

var request = require("request")

//URL del database(provvisoriamente in localhost)
var db_url = "http://localhost:5984/progetto_rc/"
//URL richiesta da CouchDB per eseguire la query
var view_url = db_url + "_design/date/_view/getByDate"


//Metodo che attraverso POST http inserisce i documenti all'interno del database tramite CouchDB
exports.save = function(doc, callback) {
    request.post({
        url: db_url,
        body: doc,
        json: true
    }, (err, resp, body) => {
        if (err) callback(-1)
        else {
            var obj = JSON.parse(body)
            if (obj.ok) callback(0)
            else callback(-1)
        }
    })
}


//Metodo che preso in input una stringa indicante la data da ricercare in formato "<Month>/<Day>" esegue una ricerca
//del relativo record all'interno del database attraverso una GET http.

exports.fetch = function(date, callback) {
    var query_string = "?key=%22" + date.replace(/\//g, "+") + "%22"
    request.get({
        url: view_url + query_string
    }, (err, res, body) => {
        if (err) callback(-1, null)
        else {
            var obj = JSON.parse(body)
            if (obj.rows) callback(0, body.rows[0].value)
            else callback(-1, null)
        }
    })
}
