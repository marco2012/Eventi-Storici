/*Esempio di utilizzo di Firebase https://firebase.google.com/docs/reference/rest/database/
(Il database sta qui https://console.firebase.google.com/u/7/project/docker-d7f6b/database/docker-d7f6b/data
accedendo con l'email dockervrun@gmail.com)
*/
var request = require("request")

var PROJECT_ID = "docker-d7f6b" //id del database firebase

//LEGGE valore nel database
var options_delete = {
  url: 'https://'+PROJECT_ID+'.firebaseio.com/users/jack/name.json'
}
//equivalente a curl 'https://docker-d7f6b.firebaseio.com/users/jack/name.json'
request.get(url_get, function callback_get(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log("valore resittuoto dal database:")
    console.log(info);
  }
});


//SCRIVE valori nel database con put
//equivalente a curl -X PUT -d '{ "first": "Jack", "last": "Sparrow" }' 'https://docker-d7f6b.firebaseio.com/users/jack/other_name.json'
//Nell'esempio creo un utente di nome 'steve' e imposto gli anni e l'email
var nome_utente = "steve"
var options_put = {
  url: 'https://'+PROJECT_ID+'.firebaseio.com/users/'+nome_utente+'.json',
  json: { "anni": "23", "email": "steve@gmail.com" }
}
request.put(options_put, function callback_put(error, response, body) {
  if (!error && response.statusCode == 200) {
     console.log("\nvalori inseriti correttamente:")
     console.log(body)
  }
});


//CANCELLA valori dal database
//equivalente a curl -X DELETE 'https://'+PROJECT_ID+'.firebaseio.com/users/'+nome_da_cancellare+'.json'
var nome_da_cancellare = 'steve'
var options_delete = {
  url: 'https://'+PROJECT_ID+'.firebaseio.com/users/'+nome_da_cancellare+'.json'
}
request.delete(options_delete, function callback_put(error, response, body) {
  if (!error && response.statusCode == 200) {
     console.log("\nvalore eliminato")
  }
});


//Inserisce valori nel database con post (genera id casuale, un po' intutile ma per provare)
var options_post = {
  url: 'https://'+PROJECT_ID+'.firebaseio.com/users.json',
  json: { "name": "Jill", "age": "21" }
}
//equivalente a curl -X PUT -d '{ "first": "Jack", "last": "Sparrow" }' 'https://docker-d7f6b.firebaseio.com/users/jack/other_name.json'
request.post(options_post, function callback_post(error, response, body) {
  if (!error && response.statusCode == 200) {
     console.log("\nvalori inseriti correttamente:")
     console.log(body)
  }
});
