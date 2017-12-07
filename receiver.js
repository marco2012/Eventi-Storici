var amqp = require("amqplib/callback_api")
var date = require("./models/date")

var q = "write_queue"

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertQueue(q, {durable: false});
        ch.consume(q, function(msg) {
            date.insert(JSON.parse(msg.content))
        })
    }, {noAck: true})
})
