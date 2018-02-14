//Utilizza Intelligenza Artificiale per analizzare immagine e generare descrizione
//https://westcentralus.dev.cognitive.microsoft.com/docs/services/56f91f2d778daf23d8ec6739/operations/56f91f2e778daf14a499e1fa/console
const request = require("request")
const ws      = require('../middlewares/ws')

const SUBSCRIPTION_KEY = ""
const visualFeature = "Description"                           //da scegliere tra Descriprion,Categories,Color,ImageType,Faces,Tags

exports.describeImage = function(imageURL, callback){
    var headers = {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY
    }
    var options = {
        url: 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures='+visualFeature+'&language=en',
        headers: headers,
        json: { "url": imageURL }
    }
    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var descrizione = body.description.captions[0].text
        console.log("[MIDDLEWARE][MICROSOFT] Descrizione trovata: " + descrizione)
        ws.send("[MIDDLEWARE][MICROSOFT] Descrizione trovata: " + descrizione)
        callback(descrizione)
      }
    });
}
