//File per la gestione di CouchDB.

const request = require("request")
const helper = require("../helpers/helper")

//URL del database
const db_name = 'docker_db'
// const db_url = "https://couchdb-35226b.smileupps.com/"+db_name
const db_url = "http://localhost:5984/"+db_name

//URL richiesta da CouchDB per eseguire la query
const view_url = db_url + "/_design/date/_view/getByDate"


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
    request.get({
        url: view_url,
        qs: { key: qs_date}
    }, (err, res, body) => {
        if (err) callback(-2, "Unable to connect")
        else {
            var obj = JSON.parse(body)
            if (obj.rows == null) callback(-1, null)
            else if (obj.rows.length >= 1) callback(0, obj.rows[0].value)
        }
    })
}
