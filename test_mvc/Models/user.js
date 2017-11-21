var db = require("../db")

//In questo file c'è il modello user per interagire con il database, in particolare create crea l'utente e fetch cerca un id specifico, i modelli sono gli unici file in cui si
//importa la libreira db.js per interagire con  couch db, il modello comments funziona nello stesso modo


exports.create = function(username, password, cb) {

    var user = {
        name: username,
        password: password
    }

    db.save(user, function(err, doc) {
        if (err) return cb("Unable to connect")
        cb(null, doc)
    })

}

exports.getById = function(id, cb) {
    db.fetch(id, function(err, doc) {
        if (err) return cb("Unable to connect")
        cb(null, doc)
    })
}
