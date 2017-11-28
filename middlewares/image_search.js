var request = require('request')

var query = ''  //parola da cercare
var n = 1       //numero di risultati da mostrare per ricerca
var url = 'https://api.qwant.com/api/search/images?count='+n+'&offset=1&q='+query
