//carico le cose che servono

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//definisco lo schema per il modello utente

var userSchema = mongoose.Schema({
	local:{
		email : String,
		password : String
	},
	facebook:{
		id : String,
		token: String,
		email : String,
		name: String
	},
	google:{
		id:String,
		token:String,
		email:String,
		name:String
	}
});

//metodi
//generazione di un hash
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

//controllo che la password sia valida
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password,this.local.password);
};

//creo il modello degli utenti
module.exports = mongoose.model('User',userSchema);