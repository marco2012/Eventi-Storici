//Utilizza Intelligenza Artificiale per analizzare immagine e generare descrizione
//https://westcentralus.dev.cognitive.microsoft.com/docs/services/56f91f2d778daf23d8ec6739/operations/56f91f2e778daf14a499e1fa/console
var request = require("request")

var SUBSCRIPTION_KEY = "aecdcf236e59452499b41a84a8a56849"
var imageURL = "https://www.greenme.it/immagini/viaggiare/citta_colorate/citta_colorate.jpg" //immagine da analizzare
var visualFeature = "Description" //da scegliere tra Descriprion,Categories,Color,ImageType,Faces,Tags

var headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY
}
var options = {
    url: 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures='+visualFeature+'&language=en',
    method: 'POST',
    headers: headers,
    json: { "url": imageURL}
}
request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // console.log(body)
    // Queste funzionano solo con Description come visualFeature
    var tags = body.description.tags
    var descrizione = body.description.captions[0].text
     console.log(descrizione)
     console.log(tags)
  }
});
