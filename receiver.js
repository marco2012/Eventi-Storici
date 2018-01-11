const amqp = require("amqplib/callback_api")
const date = require("./models/date")

const q = "write_queue"
const amqp_url = 'amqp://localhost'

//Consumer

amqp.connect(amqp_url, function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertQueue(q, {durable: false});
        ch.consume(q, function(msg) {
            console.log("[RECEIVER] Messaggio ricevuto: ");
            date.insert(JSON.parse(msg.content))
        })
    }, {noAck: true})
})
