const amqp      = require('amqplib/callback_api')
const ws        = require('../middlewares/ws')

const q         = "write_queue"

const amqp_url  = 'amqp://localhost'
// const amqp_url = 'amqp://qcsqalhj:KzTr3j30QwsPp9pkD2z887mkQ7gsc777@gopher.rmq.cloudamqp.com/qcsqalhj' //questa url funziona remoto, cosi non è necessario avere rabbitmq in esecuzione

exports.send = function(msg, callback) {
    amqp.connect(amqp_url, function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue(q, {durable: false})
            ch.sendToQueue(q, new Buffer(JSON.stringify(msg)))
            console.log("[MIDDLEWARE][AMQP]      Messaggio inviato con amqp")
            ws.send("[MIDDLEWARE][AMQP]      Messaggio inviato con amqp")
        })
        setTimeout(() => conn.close(), 500)
    })
}
