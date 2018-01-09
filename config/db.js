//File per la gestione di CouchDB.

const request = require("request")
const helper = require("../helpers/helper")

//URL del database
const db_name = 'docker_db'
// const db_url = "https://couchdb-35226b.smileupps.com/"+db_name
const db_url = "http://localhost:5984/"+db_name

//URL richiesta da CouchDB per eseguire la query
const view_url = db_url + "/_design/date/_view/getByDate"

const find_url = db_url + "/_find"


//Metodo che attraverso POST http inserisce i documenti all'interno del database tramite CouchDB
exports.save = function(doc, callback) {
    request.post({
        url: db_url,
        body: doc,
        json: true
    }, (err, resp, body) => {
        if (err) callback(-2, "Unable to connect")
        else {
            if (body.ok) callback(0, "Document stored in database")
            else callback(-1, "Unable to store document")
        }
    })
}


//Metodo che preso in input una stringa indicante la data da ricercare in formato "/<Month>/<Day>" esegue una ricerca
//del relativo record all'interno del database attraverso una GET http.

exports.fetch = function(date, callback) {
    // console.log(date)
    var split_date = date.split('/')
    var day = split_date[2]
    if (day.charAt(0) == '0') day = day.slice(1)
    var qs_date = '\"' + helper.resolveMonth(split_date[1]) + ' ' + day + '\"'
    console.log('[  CONGIF  ][DB]        Data da cercare nel DB: '+ qs_date);
    // Richiesta post per ricercare dati nel database
    request.post({
        url: find_url, //_find
        json: true, //comunicazione avviene utilizzando Json
        body: { // Dalle API di couh db http://docs.couchdb.org/en/2.1.1/api/database/find.html?highlight=query
          "selector":{
            // Ricerca nei documenti (tabella) di couchdb se presente un record che come campo "date" contiene
            // la data specificata
            "date":helper.resolveMonth(split_date[1]) + ' ' + day //Data in formato Month day Esempio: May 11
          }
        }
    }, (err, res, body) => {
        if (err) callback(-2, "Unable to connect")
        else {
          // La risposta è un Json contenuto nella variabile body nel formato:
          // {docs: [{ris1},{ris2},{ris2}]}
          if (body.docs.length == 0) callback(-1, null)
          else callback(0, body.docs[0]) //Ritorno solo il primo.
        }
    })
}
