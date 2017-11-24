//carico cose che servono

var mongoose = require('mongoose');

//definisco schema per modello smartphone
 
var smartphoneSchema = mongoose.Schema({
	smartphone:{
		model:String,
		cpu : String,
		storage: String,
		removable:String,
		ram: String,
		os: String,
		size:{
			l:Number,
			h:Number,
			w:Number
		},
		weight:Number,
		battery:String,
		display:String,
		camera:{
			rear:Number,
			front:Number
		},
		image:String
	}
});
//creo il modello degli smartphone
module.exports = mongoose.model('Smartphone',smartphoneSchema);

