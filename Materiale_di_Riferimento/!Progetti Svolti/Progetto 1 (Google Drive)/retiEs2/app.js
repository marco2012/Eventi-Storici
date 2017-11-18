var express = require('express');
var termostato = require('./termostato');
var app = express();

//PORTA
var PORT = 3000;

//ACCENDE
app.put('/', function (req, res){
  if (termostato.whatStato() === 1){
    res.send('Termostato già acceso\n');
  } else {
    termostato.accendi();
    console.log('Termostato: ' + termostato.whatStato());
    res.send('Termostato acceso correttamente\n');
  }
});

//SPEGNE
app.delete('/', function(req, res){
  if (termostato.whatStato() === 0){
    res.send('Termostato già spento\n');
  } else {
    termostato.spegni();
    console.log('Termostato: ' + termostato.whatStato());
    res.send('Termostato spento correttamente\n');
  }
});

app.get('/', function(req, res){
  if (termostato.whatStato() === 0){
    res.send('Il termostato è spento\n');
  } else {
    res.send('Il termostato è acceso\n');
  }
})

//LISTEN
app.listen(PORT);
console.log('Sever in ascolto sulla porta ' + PORT);
console.log('Termostato: ' + termostato.whatStato());
