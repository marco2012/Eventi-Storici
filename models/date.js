//File che si occupa della gestione dei vari record delle date e del loro salvataggio

var db = require("../config/db")


//Metodo che inserisce i documenti all'interno del database.
//In caso di successo nell'insermineto restituisce callback(null), altrimenti restituisce callback(err) dove
//err indica la natura dell'errore.
exports.insert(doc, callback) {
    db.save(doc, function(err) {
        if (err) callback(err)
        else callback(null)
    })
}

//Metodo che preso in input una stringa indicante la data da ricercare in formato "<Month> <Day>" esegue una ricerca
//del relativo record all'interno del database.
//In caso di successo nella ricerca restituisce callback(null, doc), altrimenti restituisce callback(err, doc) dove
//err indica la natura dell'errore.
exports.search(date, callback) {
    db.fetch(date, function(err, doc) {
        if (err) callback(err, null)
        else callback(null, doc)
    })
}
