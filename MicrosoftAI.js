var request = require("request")

//https://westus.dev.cognitive.microsoft.com/docs/services/56f91f2d778daf23d8ec6739/operations/56f91f2e778daf14a499e1fa/console
var SUBSCRIPTION_KEY = "aecdcf236e59452499b41a84a8a56849"
var SUBSCRIPTION_REGION = "westcentralus"

var imageUrl = "https://blogs-images.forbes.com/erikkain/files/2017/02/Vikings-Season-4-Finale-Colorful-Shields.jpg"


var headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'aecdcf236e59452499b41a84a8a56849'
}
var options = {
    url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description',
    method: 'POST',
    headers: headers,
    json: { "url":"https://blogs-images.forbes.com/erikkain/files/2017/02/Vikings-Season-4-Finale-Colorful-Shields.jpg"}
}
request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
     console.log(body)
  }
});
