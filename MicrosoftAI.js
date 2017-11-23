var request = require("request")

//https://westcentralus.dev.cognitive.microsoft.com/docs/services/56f91f2d778daf23d8ec6739/operations/56f91f2e778daf14a499e1fa/console

var SUBSCRIPTION_KEY = "aecdcf236e59452499b41a84a8a56849"

var imageUrl = "http://www.archeoroma.it/wp-content/uploads/2016/10/Colosseo-laptop_1040_529.jpeg"

var headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY
}
var options = {
    url: 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description&language=en',
    method: 'POST',
    headers: headers,
    json: { "url": imageUrl}
}
request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
     console.log(body.description.captions[0].text)
  }
});
