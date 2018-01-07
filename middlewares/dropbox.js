const Dropbox         = require('dropbox');
const fs              = require('fs');
const path            = require('path')
const ws              = require('../middlewares/ws')

//Variabili per la gestione di dropbox
const redirect_url    = "http://localhost:3000/oauth2callback/" //dove vengo reindirizzato dopo aver accettato permessi dropbox
const client_id       = "v5i2atoizvgsnct" //app key
const client_secret   = "vdnzz190sntd7sk" //app secret
const oauthlink       = "https://www.dropbox.com/oauth2/authorize?client_id=" + client_id + "&response_type=code&redirect_uri=" + redirect_url //https://www.dropbox.com/developers/documentation/http/documentation#oauth2-authorize

exports.getUrl = function () { return oauthlink }
exports.getClientId = function () { return client_id }
exports.getClientSecret = function () { return client_secret }
exports.getRedirectUrl = function () { return redirect_url }
exports.authenticate = function (res) { res.redirect(oauthlink) }

exports.upload = function (doc, token) {

    var fileName    = doc.date.replace(' ', '_') + '.txt'   //ad esempio May_1.txt
    var projectPath = path.resolve('.');                    //percorso della cartella Docker nel computer locale (ad esempio /home/biar/Desktop/Docker)
    if (!fs.existsSync('./txt')) fs.mkdirSync('./txt');     //crea la cartella /txt se non esiste
    var filePath    = projectPath + '/txt/' + fileName      //percorso del file da creare e caricare

    ///////////////////SCRITTURA////////////////////
    //Scrive file nella cartella /txt
    var stream = fs.createWriteStream(filePath); //Creo il file
    var info = doc
    stream.once('open', function (fd) {
        for (var i = 0; i < info.events.length; i++) {
            //Reperisco gli eventi (titolo e link)
            var year = info.events[i].year;
            var title = info.events[i].text;
            var link = info.events[i].links[0].link;
            var stringa = "- Anno: " + year + " Evento: " + title + " Link: " + link + "\n\n";
            stream.write(stringa);
        }
        stream.end() //EndOfFile

        console.log("[MIDDLEWARE][DROPBOX]    File di eventi " + fileName + " creato in locale");
        ws.send("[MIDDLEWARE][DROPBOX]    File di eventi " + fileName + " creato in locale");

        ///////////////////UPLOAD////////////////////
        token = token.replace(new RegExp('"', 'g'), '')
        var dbx = new Dropbox({ accessToken: token });

        fs.readFile(filePath, 'utf8', function (err, contents) {
            dbx.filesUpload({
                path: '/Eventi_Storici/'+fileName,  //path si riferisce a dropbox, non al file locale
                contents: contents,
                mode: 'overwrite'                   //sovrascrive file se gia esiste
            }) .then(function (response) {
                console.log("[MIDDLEWARE][DROPBOX]   "+fileName+" caricato su Dropbox")
                ws.send('[MIDDLEWARE][DROPBOX]   <a target="_blank" href="https://www.dropbox.com/home/Eventi_Storici?preview='+fileName+'">'+fileName+'</a> caricato su Dropbox')
            }).catch(function (err) {
                console.log(err);
            });
        })

    })
}
