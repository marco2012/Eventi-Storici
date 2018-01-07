//File che si occupa della gestione dei vari record delle date e del loro salvataggio

var db = require("../config/db")
var request = require("request")
var ml_url = "http://history.muffinlabs.com/date"


//Salva una data all'interno di couchdb
exports.insert = function(doc) {
    db.save(doc, (res, msg) => (res, msg) => {
        console.log("ritorno dal db")
        console.log(msg)
    })
}


//Metodo che verifica la presenza del record relativo alla data nel database.
//La data da dare in input deve essere fornita in formato "/<Mese>/<Anno>"
//dove il mese e l'anno sono indicati come numeri.
//Il 5 gennaio ad esempio deve essere cercato come search("/1/5", callback).
//Se esso non è presente nel databse il metodo esegue la chiamata all'API muffin labs restituendo
//callback(-1, obj), se invece il doumento è presente nel databse restituisce callback(0, obj).
//callback(-2, msg) indica la presenza di un errore di rete e msg specifica l'errore

exports.search = function(date, callback) {
    db.fetch(date, (result, doc) => {
        if (result == -1 && doc == null) {
            request.get(ml_url + date, (err, resp, body) => {
                if (err) callback(-2, "Unable to connect for API utilization")
                else {
                    var obj = JSON.parse(body)
                    var ret_obj = {
                        date: obj.date,
                        url: obj.url,
                        events: []
                    }
                    for (var i = 0; i < obj.data.Events.length; i++) {
                        ret_obj.events[i] = {
                            year: obj.data.Events[i].year,
                            text: obj.data.Events[i].text,
                            links: obj.data.Events[i].links
                        }
                    }
                    callback(result, ret_obj)
                }
            })
        }
        else callback(result, doc)
    })
}
