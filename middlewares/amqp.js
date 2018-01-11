const amqp      = require('amqplib/callback_api')
const ws        = require('../middlewares/ws')

const q         = "write_queue"

const amqp_url  = 'amqp://localhost'

//Producer

exports.send = function(msg, callback) {
    amqp.connect(amqp_url, function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue(q, {durable: false}) //crea coda se non c'e'
            ch.sendToQueue(q, new Buffer(JSON.stringify(msg))) //messaggio di muffinlabs
            console.log("[MIDDLEWARE][AMQP]      Messaggio inviato con amqp")
            ws.send("[MIDDLEWARE][AMQP]      Messaggio inviato con amqp")
        })
        setTimeout(() => conn.close(), 500)
    })
}
