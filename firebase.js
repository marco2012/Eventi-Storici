/*Esempio di utilizzo di Firebase https://firebase.google.com/docs/database/web/start
(Il database sta qui https://console.firebase.google.com/u/7/project/docker-d7f6b/database/docker-d7f6b/data
accedendo con l'email dockervrun@gmail.com)
*/
var request = require("request")

var PROJECT_ID = "docker-d7f6b"

var url_get = 'https://'+PROJECT_ID+'.firebaseio.com/users/jack/name.json'

//Legge valore nel database

request.get(url_get, function callback_get(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log("valore resittuoto dal database:")
    console.log(info);
  }
});


//Scrive valori nel database
var options_put = {
  url: 'https://'+PROJECT_ID+'.firebaseio.com/users/jack/other_name.json',
  json: { "first": "Jack", "last": "Sparrow" }
}
request.put(options_put,function callback_put(error, response, body) {
  if (!error && response.statusCode == 200) {
     console.log("\nvalori inseriti correttamente:")
     console.log(body)
  }
});
