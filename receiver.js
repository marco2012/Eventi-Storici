const amqp = require("amqplib/callback_api")
const date = require("./models/date")

const q = "write_queue"
const amqp_url = 'amqp://localhost'
// const amqp_url = 'amqp://qcsqalhj:KzTr3j30QwsPp9pkD2z887mkQ7gsc777@gopher.rmq.cloudamqp.com/qcsqalhj' //questa url funziona remoto, cosi non è necessario avere rabbitmq in esecuzione

amqp.connect(amqp_url, function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertQueue(q, {durable: false});
        ch.consume(q, function(msg) {
            console.log("[RECEIVER] Messaggio ricevuto: ");
            date.insert(JSON.parse(msg.content))
        })
    }, {noAck: true})
})
