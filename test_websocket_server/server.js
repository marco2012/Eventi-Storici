var http = require("http");

function onRequest(request, response) {
      console.log("Richiesta ricevuta dal server");
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Richiesta ricevuta");
      response.end();
}

http.createServer(onRequest).listen(8080);
console.log("Server avviato");
