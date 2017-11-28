//https://developers.google.com/drive/v3/web/simple-upload

var request = require('request')
var fs = require('fs')

var file = fs.createReadStream('docker_image.png')
var at = 'ya29.GlsSBTsJsAoTZBkj__7ZoItpzXmckEkm_mYA9fe31a9Dkf_WkCR8AL4h39ZRkVipHGNGfl7Y2VNy7c536VvX7HWVIn_1fLYoRtAKmO0W6YqX71I5JWEdxA1b_7r6'
function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats["size"]
    return fileSizeInBytes
}

var options = {
    url : 'https://www.googleapis.com/upload/drive/v3?uploadType=media',
    'Content-Type': 'image/jpeg',
    'Content-Length': getFilesizeInBytes('docker_image.png'),
    'Authorization': 'Bearer '+at,
    'body' : file,
    json : true
}

request.post(options, function(req,res){
    console.log(res)
})
