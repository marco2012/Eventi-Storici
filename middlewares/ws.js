const WSS = require('ws').Server;
const wss = new WSS({ port: 4000 }); // Start the server

// When a connection is established
wss.on('connection', function(socket) {

    //when client is connected
    console.log('[WEBSOCKET] Connessione aperta');
    socket.send('[WEBSOCKET] Connessione aperta')

    // When data is received
    socket.on('message', function(message) {
        console.log('[WEBSOCKET] Ricevuto dal client: ' + message);
    });

    // The connection was closed
    socket.on('close', function() {
        console.log('[WEBSOCKET] Connessione chiusa');
    });

});

// Broadcast msg to all connected clients
exports.send = function(msg) {
    // wss.clients is an array of all connected clients
    wss.clients.forEach(function each(client) {
        client.send(msg);
        // console.log('[WEBSOCKET] Inviato al client: ' + msg);
    });
}
