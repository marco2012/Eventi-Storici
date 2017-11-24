//carico le cose che servono
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//carico il modello utente
var User = require('../app/models/user');

//carico le variabili auth
var configAuth = require('./auth');

module.exports = function(passport){
	//usato per serializzare l'utente
	passport.serializeUser(function(user,done){
		done(null,user.id);
	});
	//usato per deserializzare l'utente
	passport.deserializeUser(function(id,done){
		User.findById(id,function(err,user){
			done(err,user);
		});
	});
	
	//REGISTRAZIONE LOCALE
	
	 passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // uso email lower case per evitare email già usate

        // asincrono
        process.nextTick(function() {
            // se l'utente non è già loggato
            if (!req.user) {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // se ci sono errori, restituisco err
                    if (err)
                        return done(err);

                    // controllo se già c'è un utente con questa email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // creo l'utente
                        var newUser            = new User();

                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }

                });
            // se l'utente è loggato ma non ha un account locale
            } else if ( !req.user.local.email ) {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err)
                        return done(err);
                    
                    if (user) {
                        return done(null, false, req.flash('loginMessage', 'Email già usata.'));
                    } else {
                        var user = req.user;
                        user.local.email = email;
                        user.local.password = user.generateHash(password);
                        user.save(function (err) {
                            if (err)
                                return done(err);
                            
                            return done(null,user);
                        });
                    }
                });
            } else {
                // l'utente è già loggato e ha già un account locale
                return done(null, req.user);
            }

        });

    }));
	
	//LOGIN LOCALE
	passport.use('local-login',new LocalStrategy({
		usernameField:'email',
		passwordField:'password',
		passReqToCallback:true
	},
	function(req,email,password,done){
		if(email)
			email = email.toLowerCase();
		
		process.nextTick(function(){
			User.findOne({'local.email':email},function(err,user){
				if(err){
					return done(err);
				}
				if(!user){
					return done(null,false,req.flash('loginMesssage','Utente non trovato.'));
				}
				if(!user.validPassword(password)){
					return done(null,false,req.flash('loginMessage','Ooops!Password errata.'));
				}
				else{
					return done(null,user);
				}
			});
		});
		
	}));
	
	//FACEBOOK LOGIN
	 var fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true; 
    passport.use(new FacebookStrategy(fbStrategy,
    function(req, token, refreshToken, profile, done) {

        // asincrono
        process.nextTick(function() {

            // controlla se l'utente è già loggato
            if (!req.user) {

                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // se c'è già un id ma non il token 
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user); //utente trovato, restituisco quell'utente
                    } else {
                        //se non esiste già l'utente, lo creo
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // l'utente esiste ed è loggato 
                var user            = req.user;

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }
        });

    }));
	
	//GOOGLE LOGIN
	passport.use(new GoogleStrategy({
		clientID : configAuth.googleAuth.clientID,
		clientSecret : configAuth.googleAuth.clientSecret,
		callbackURL : configAuth.googleAuth.callbackURL,
		passReqToCallback: true
	},
	
	function(req,token,refreshToken,profile,done){
		//Asincrono
		process.nextTick(function(){
			//controllo se l'utente è già loggato
			if(!req.user){
				User.findOne({'google.id':profile.id},function(err,user){
					if(err)
						return done(err);
					if(user){
						//Se c'è già l'id ma non il token
						if(!user.google.token){
							user.google.token = token;
							user.google.name = profile.displayName;
							user.google.email = (profile.emails[0].value || '').toLowerCase();
							
							user.save(function(err){
								if(err)
									return done(err);
								return done(null,err);
							});
						}
						return done(null,user);
					}
					else{
						var newUser = new User();
						newUser.google.id = profile.displayName;
						newUser.google.token = token;
						newUser.google.name = profile.displayName;
						newUser.google.email = (profile.emails[0].value || '').toLowerCase();
						
						newUser.save(function(err){
							if(err)
								return done(err);
							return done(null,newUser);
						});
					}
				});
			}
			else{
				//l'utente esiste già ed è loggato
				var user = req.user;
				user.google.id = profile.id;
				user.google.token = token;
				user.google.name = profile.displayName;
				user.google.email = (profile.emails[0].value || '').toLowerCase();
				
				user.save(function(err){
					if(err)
						return done(err);
					return done(null,user);
				});
			}
		});
	}));
};