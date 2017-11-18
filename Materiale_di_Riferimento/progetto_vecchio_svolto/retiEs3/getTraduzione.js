var https = require('https');



module.exports = function(cerca, callback){
  var apikey = "->->-> inserire qua la vosta apikey per google translate <-<-<-";
  var parola = cerca;
  var indirizzo = "https://translation.googleapis.com/language/translate/v2?key=" + apikey + "&source=en&target=it&q=" + parola;
  var risposta = "";

  var req = https.get(indirizzo, function(res){
    res.setEncoding("utf8");
    res.on("data", function (pezzo) {
        risposta += pezzo;
    });
    res.on("end", function () {
      callback(risposta);
    });
  });
  req.end();
};
