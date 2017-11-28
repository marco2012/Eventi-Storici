var request = require('request');

var n = 1;
var query = ''


var options = {

    url : 'https://api.qwant.com/api/search/images?count=5&offset=1&q=gatti'
}

request.get(options, function callback(body) {
        var info = JSON.parse(body);

        console.log(body);
        /*for (var i = 0; i < info.data.result.items.length; i++) {
            console.log(info[1].data.result.items[0].media)
        }*/

});









/*
request.get(options, function callback(body){
    var info = JSON.parse(body);
    for(i = 0; i < info.data.result.lenght; i++){
        var image = info.data.result[i].items[2];
        console.log(image);
    }
});
*/
