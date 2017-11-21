
//apiGreads restituisce la api key per servizi rest di Goodreads.com

var apikeyGood= "aXsHkdwAd69oy6KmiLDSng";

exports.getAccess= function (callback){
	callback(apikeyGood);
}