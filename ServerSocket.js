/*
var http = require('http');

http.createServer(function(request,response){
 response.writeHead(200);
 request.on('data',function(message){
 response.write(message);
 });

 request.on('end',function(){
 response.end();
 });
 }).listen(8080);
*/
/*
var http = require("http");

function onRequest(request, response) {
      console.log("Richiesta ricevuta dal server");
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Richiesta ricevuta");
      response.end();
}

http.createServer(onRequest).listen(8080);
console.log("Server avviato");
*/
var http = require('http');

http.createServer(function(request,response){

 response.writeHead(200);
 request.pipe(response);

}).listen(8080);
