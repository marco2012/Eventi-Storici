#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://latuvdhv:UM6gFntpywbY-LlJqtkfMuiCsj9NZ1Ld@zebra.rmq.cloudamqp.com/latuvdhv',function(err,conn){
	conn.createChannel(function(err,ch){
		var q = 'smartphone';
		
		ch.assertQueue(q,{durable:false});
		console.log("[*]In attesa di nuovi messaggi. Premi CTRL+C per uscire",q);
		ch.consume(q,function(msg){
			var fs = require('fs');
			fs.appendFile('log.txt','\n' + msg.content.toString(),(err)=>{
				if(err)throw err;
			})
			console.log("[X] Received %s",msg.content.toString());
		},{noAck:true});
	});
});