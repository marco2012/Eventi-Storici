var http = require("http");

function onRequest(request, response) {
      console.log("Ho ricevuto una richiesta: "+request);
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Ho ricevuto la tua richiesta: "+request);
      response.end();
}

http.createServer(onRequest).listen(8080);
console.log("Server avviato");
