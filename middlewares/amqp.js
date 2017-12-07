var amqp = require('amqplib/callback_api')

var q = "write_queue"

exports.send = function(msg, callback) {
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue(q, {durable: false})
            ch.sendToQueue(q, new Buffer(JSON.stringify(msg)))
            console.log("[MIDDLEWARE][AMQP] Mandato messaggio con amqp")
        })
        setTimeout(() => conn.close(), 500)
    })
}
