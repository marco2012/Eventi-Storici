//https://stackoverflow.com/questions/34399049/dropbox-direct-upload-files-from-browser
var dropboxToken = OAuth token received then signing in with OAuth.
//var file = file object selected in the file widget.

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

xhr.upload.onprogress = function(evt) {
    var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
    // Upload in progress. Do something here with the percent complete.
};

xhr.onload = function() {
    if (xhr.status === 200) {
        var fileInfo = JSON.parse(xhr.response);
        // Upload succeeded. Do something here with the file info.
    }
    else {
        var errorMessage = xhr.response || 'Unable to upload file';
        // Upload failed. Do something here with the error.
    }
};

xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
xhr.setRequestHeader('Content-Type', 'application/octet-stream');
xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
    path: '/' +  'docker_image.png',
    mode: 'add',
    autorename: true,
    mute: false
}));

xhr.send(file);
