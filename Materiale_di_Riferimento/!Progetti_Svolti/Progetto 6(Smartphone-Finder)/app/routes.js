var Smartphone = require('./models/smartphone');//carico il modello smartphone		

var amqp = require('amqplib/callback_api');//libreria per usare rabbitmq

module.exports = function(app,passport){
	
	//HOME PAGE con i link per il login
	app.get('/',function(req,res){
		res.render('index.ejs'); //carico il file index.ejs
	});
	
	//LOGOUT
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
	
	//LOGIN
	//Mostra il form del login
	app.get('/login',function(req,res){
		res.render('login.ejs',{message: req.flash('loginMessage')});
	});
	
	//processa il form del login
	app.post('/login',passport.authenticate('local-login',{
		successRedirect:'/search',
		failureRedirect:'/login',
		failureFlash:true
	}));
	
	
	//SIGNUP
	//mostro il il form per la registrazione
	app.get('/signup',function(req,res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});
	//operazioni sul form della registrazione
	app.post('/signup', passport.authenticate('local-signup',{
		successRedirect:'/',
		failureRedirect:'/signup',
		failureFlash:true
	}));
	
	// -------------------------------------
    // SMARTPHONE SECTION ------------------
    // -------------------------------------
	//bisogna essere loggati per visitarlo
	//uso isLoggedIn per verificarlo
	/*Smartphone.create(
	{	'smartphone.model':'OnePlus 3',
		'smartphone.cpu':'Quad Core 2x 2.2 GHz & 2x 1.6 GHz',
		'smartphone.storage':'64 GB',
		'smartphone.removable':'6 GB LPDDR4',
		'smartphone.ram':'No card slot',
		'smartphone.os':'Android 6.0 Marshmallow',
		'smartphone.size.l':152.7,
		'smartphone.size.h':74.7,
		'smartphone.size.w':7.35,
		'smartphone.weight':158,
		'smartphone.battery':'3000 mAh Li-Ion non-removable battery',
		'smartphone.display':'5.5", 1920 x 1080',
		'smartphone.camera.rear':16,
		'smartphone.camera.front':8,
		'smartphone.image':'http://www.smartylife.net/media/catalog/product/i/m/img-5.png'});*/
		
	var smart; //variabile contenente le specifiche dello smartphone cercato
	//Mostro le specifiche del modello di smartphone cercato
	app.get('/smartphone',isLoggedIn,function(req,res){
		res.render('smartphone.ejs',{
			model:smart.smartphone.model,
			cpu:smart.smartphone.cpu,
			storage:smart.smartphone.storage,
			removable:smart.smartphone.removable,
			ram:smart.smartphone.ram,
			os:smart.smartphone.os,
			l:smart.smartphone.size.l,
			h:smart.smartphone.size.h,
			w:smart.smartphone.size.w,
			weight:smart.smartphone.weight,
			battery:smart.smartphone.battery,
			display:smart.smartphone.display,
			rear:smart.smartphone.camera.rear,
			front:smart.smartphone.camera.front,
			img_url:smart.smartphone.image
		});
	});
	
	//mostro la barra di ricerca iniziale
	app.get('/search',isLoggedIn,function(req,res){
		res.render('search.ejs');
	});
	//cerco il modello di smartphone nel database e invio il log della ricerca tramite rabbitmq
	app.post('/search',isLoggedIn,function(req,res){
		
		Smartphone.findOne({'smartphone.model':req.body.model.toLowerCase()},function(err,result){
			if (err){
                return done(err);
			}        
            if (result==null) {
                res.redirect('/search');
				console.log('Smartphone non trovato');
            } else {
					smart = result;
					amqp.connect('amqp://latuvdhv:UM6gFntpywbY-LlJqtkfMuiCsj9NZ1Ld@zebra.rmq.cloudamqp.com/latuvdhv',function(err,conn){
						conn.createChannel(function(err,ch){
							var q = 'smartphone';
							ch.assertQueue(q,{durable:false});
							ch.sendToQueue(q,new Buffer(new Date + ': ' + smart.smartphone.model));
						});
					});
					res.redirect('/smartphone');
			}
		});
	});
	
	//FACEBOOK LOGIN

        // invio a facebook per autenticazione
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // callback dopo che l'utente è stato autenticato
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/search',
                failureRedirect : '/'
            }));
			
	//GOOGLE LOGIN 
		// invio a google per l'autenticazione
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // callback dopo che l'utente è stato autenticato
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/search',
                failureRedirect : '/'
        }));
};

function isLoggedIn(req,res,next){
	//se l'utente è già autenticato vai avanti
	if(req.isAuthenticated())
		return next();
	//altrimenti rimandami all'homepage
	res.redirect('/');
}