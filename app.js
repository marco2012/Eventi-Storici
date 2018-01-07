const whale =
        "\n                ##        .              \n" +
        "            ## ## ##        ==             \n" +
        "         ## ## ## ## ##    ===             \n" +
        "     /-------------------\\___/ ===        \n" +
        "~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~    \n" +
        "     \\______ o           __/              \n" +
        "      \\    \\         __/                 \n" +
        "       \\____\\_______/                    \n"

const express = require('express')
const app = express()

app.use("/static", express.static('views')); //cosi' vengono caricati i css esterni delle pagine html mandate con sendFile

const exec = require('child_process').exec;
exec('node ./receiver.js', function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    if (error !== null) console.log('exec error: ', error);
})

app.use(require('./controllers'))

//Start server
app.listen( 3000, function() {
    console.log(whale);
    console.log('[APP]                   In ascolto sulla porta 3000...')
})
