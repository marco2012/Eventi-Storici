//File che si occupa della gestione dei vari record delle date e del loro salvataggio

var db = require("../config/db")


//Metodo che inserisce i documenti all'interno del database.
//Prende in input un oggetto javascript indicante il documento da inserire nel database.
//In caso di successo nell'insermineto restituisce callback(0), altrimenti restituisce callback(-1).
//Si sfrutta il meccanismo della callback, quindi quando invocate questo metodo dovete fornire una funzione
//anonima che dato un risultato agisce opportunamente.
//In quetso caso particolare 0 indica il corretto inserimento, -1 indica un errore
exports.insert = function(doc, callback) {
    db.save(doc, (res) => {
        if (err == -1) callback(err)
        else callback(0)
    })
}

//Metodo che preso in input una stringa indicante la data da ricercare in formato "<Month>/<Day>" esegue una ricerca
//del relativo record all'interno del database.
//In caso di successo nella ricerca restituisce callback(0, doc), altrimenti restituisce callback(-1, doc).
//Anche in questo caso vengono sfruttate le callback, quindi all'invocazione del metodo search
//dovete fornire una funzione anonima che presi in input un docuemto e un codice di ritorno, agisce di conseguenza
//0 indica in successo e doc in questo caso sarà un oggetto javascript contente il documento di interesse,
//-1 indica l'assenza del documento nel database
exports.search = function(date, callback) {
    db.fetch(date, => (res, doc) {
        if (res == -1) callback(res, null)
        else callback(0, doc)
    })
}
