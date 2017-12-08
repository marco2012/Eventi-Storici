var amqp = require('amqplib/callback_api');
var fs = require('fs');
var progressivo = 0;


amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    
    //Exchange
    var ex = 'exchange_rc';
    ch.assertExchange(ex, 'direct', {durable: true});

    //CODA
    ch.assertQueue('codareti', {durable: true}, function(err, q) {
      ch.bindQueue(q.queue, ex, 'bindkey');
      console.log(" Attesa messaggi. CTRL+C per terminare");
      
      ch.consume(q.queue, function(msg) {
        var j = JSON.parse(msg.content.toString());
        fs.writeFile('./lista_'+progressivo+'.json', JSON.stringify(j, null, 2), function (err) {
          if (err) return console.log(err);
          console.log('Lista_'+progressivo+' scritto correttamente');
          progressivo++;
        });
      }, {noAck: true});
    });

  });
});
