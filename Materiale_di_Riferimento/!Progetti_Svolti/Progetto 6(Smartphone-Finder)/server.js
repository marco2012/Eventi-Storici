// server.js

// configurazione ======================================================================
// importo tutto quello che serve
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url); // Mi connetto al database

require('./config/passport')(passport);

// set up di express
app.use(morgan('dev')); // logga ogni richiesta sulla console
app.use(cookieParser()); // legge i cookie (serve per auth)
app.use(bodyParser.json()); // per prendere informazioni da form html
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // configura ejs per il template

// richiesto per passport
app.use(session({
    secret: 'jdfdieowkfjgksmxfkswldflsfjis', // sessione segreta
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // sessioni persistenti per il login
app.use(flash()); // per i messaggi flash
// routes ======================================================================
require('./app/routes.js')(app, passport); // carica le routes nell'app e configura passport

// lancio ======================================================================
app.listen(port);
console.log('In ascolto sulla porta ' + port);