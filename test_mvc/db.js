//Questo è il file che serve per interaggire con couchdb, il metodo save salva attraverso una post sul databse, l'altro fa una query sull'id nel database
//Per poter eseguire query in couchdb create all'interno del databse prova un documento di questo tipo:
//  "_id": "_design/prova",
//  "views": {
//    "all": {
//      "map": "function(doc) { emit(doc._id, doc) }"
//    }
//  }
//}

//In pratica cosi facendo si crea una view che viene calcoalta ogni volta che viene ricevuta una get su db/_design/prova/_view/all
//La funzine map prende sempre in ingresso un documento, mentre la emit è ciò che viene restituito dal databse.
//Il primo paramentro della emit indica cio che volgiamo considerare come chiave, il secondo è il value associato(in questo ho  usato il campo ._id come chiave
//e il campo doc come value)


var request = require("request")

var db_url = "http://localhost:5984/prova"

//Questo metodo inserisce semplicemente un nuovo documento all'interno del database lo restituisce al chiamante
exports.save = function(doc, res) {
    request.post({
        url: db_url,
        body: doc,
        json: true
    }, function(err, resp, body) {
        if(err) return res("Unable to connect")
        if (body.ok){
            doc._rev = body.rev
            res(null, doc)
        }
    })
}

//Questo metodo esegue una query sul databse una volta che gli è stato fornito l'id unnivoco dell'oggetto del database
exports.fetch = function(id, res) {
    request.get({
        url: db_url + "/_design/prova/_view/all?key=%22" + id + "%22",  //in questa url ho aggiunto un parametro di ricerca con un id che mi ero salvato  da un documento
    }, function(err, resp, body) {                                       //preesistente in couchdb, %22 è l'encoding per "
        if (err) return res("unable to connect")
        res(null, body)
    })
}
