////////////////////////////////////////
/////////////AUTENTICAZIONE/////////////
////////////////////////////////////////
var CLIENT_ID = "282478069354-segjrssj65eartbgvvn212iqftjbfivj.apps.googleusercontent.com"
var CLIENT_SECRET = "34cy0OjwgotDTtnFTkUOE0Hw"
var REDIRECT_URL = "https://developers.google.com/oauthplayground"
var REFRESH_TOKEN = "1/fMRTq-Np0_qlXRWqRdTZloX-LpFLItzjEYuSikxGfeQ"

exports.authenticate = function(callback){

var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.credentials = { refresh_token: REFRESH_TOKEN }; //auth
google.options({ auth: oauth2Client }); // set auth as a global default

callback(oauth2Client)

}
