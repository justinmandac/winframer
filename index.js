/**
 * @fileoverview Initializes a Windows Framer project at a specified directory.
*/
var options = require('./args.js');
var config = require('./config.js');
// Download dependencies
var fs = require('fs');
var https = require('https');
// Display command line arguments
var destinationDir = options['dir']
var doesUpdate = options['update'];
var fileName = 'Framer.zip';

var downloadFramer = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb);
        });
    }).on('error', function(err) {
        fs.unlink(dest);
        if (cb) cb(err.message);
    });
};

if (doesUpdate) {
    console.log('Downloading Framer.zip');
    downloadFramer(url, './'+ fileName , function(errMsg) {
        if (errMsg) {
            console.error(errMsg);
            return;
        }
        console.log('Download complete! Saved at ' + destinationDir);
    })
} else {
    console.log('using stored file.');
}