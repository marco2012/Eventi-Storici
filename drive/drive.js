var express = require("express");
var request = require("request");
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs'); //Libreria file-system per la gestione dei file
var app= express();
var https= require("https");

var hostname= "localhost";
var port= 3000;


app.get('/eventi', function(req, res){
    var options = {
        url: 'http://history.muffinlabs.com/date/2/14'
    }
    request.get(options, function callback(error, response, body) { //Eseguo la richiesta per reperire gli eventi storici

        if (!error && response.statusCode == 200) { //Se non ci sono errori
            var stream = fs.createWriteStream("/tmp/eventi_storici.txt"); //Creo il file
            var info = JSON.parse(body); //Trasformo in json la risposta della richiesta http
            stream.once('open', function(fd){
                for(var i = 0; i < info.data.Events.length; i++) {
                    //Reperisco gli eventi (titolo e link)
                    for (var kk = 0; kk < info.data.Events[i].links.length; kk++) {
                        var title = info.data.Events[i].links[kk].title;
                        var link = info.data.Events[i].links[kk].link;
                        stream.write("Titolo: " + title + ", Link: " + link + "\n")
                    }
                }
                stream.end() //EndOfFile
                /*
                 * Adesso eseguo upload del file eventi_storici appena creato
                 */
                var CLIENT_ID = "282478069354-segjrssj65eartbgvvn212iqftjbfivj.apps.googleusercontent.com"
                var CLIENT_SECRET = "34cy0OjwgotDTtnFTkUOE0Hw"
                var REDIRECT_URL = "https://developers.google.com/oauthplayground"
                var REFRESH_TOKEN = "1/fMRTq-Np0_qlXRWqRdTZloX-LpFLItzjEYuSikxGfeQ"

                var auth = new googleAuth();
                var oauth2Client = new auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
                oauth2Client.credentials = { refresh_token: REFRESH_TOKEN }; //auth
                google.options({ auth: oauth2Client }); // set auth as a global default
                var drive = google.drive('v3');
                var fileMetadata = {
                    'name': 'eventi_storici2.txt'                 //nome che apparira' su google drive
                };
                var media = {
                    mimeType: 'plain/text',                  //tipo/estensione del file da caricare. in genere lo capisce automaticamente
                    body: fs.createReadStream('/tmp/eventi_storici.txt')    //nome del file locale da caricare
                };
                drive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: 'id'
                }, function (err, file) {
                    if (err) { // Handle error
                        console.error(err);
                    } else {
                        console.log('File uploaded. Id: ', file.id);
                    }
                });

            })
        }
    })
})

app.listen(port, hostname, function(){
    console.log("Server running at: "+hostname+":"+port+"\n");
});