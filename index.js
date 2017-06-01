/**
 * @fileoverview Initializes a Windows Framer project at a specified directory.
*/
var url = 'https://builds.framerjs.com/version/latest/Framer.zip?utm_source=GitHub%2C%20framerjs%2C%20readme&utm_medium=Github';
var commandLineArgs = require('command-line-args');
var commandLineOpts = [
    {name: 'dir', alias: 'd', type: String}
];
var options = commandLineArgs(commandLineOpts);
// Download dependencies
var fs = require('fs');
var https = require('https');
// Display command line arguments
var destinationDir = options['dir']
var fileName = 'Framer.zip';
console.log(options);

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

downloadFramer(url, './'+ fileName , function(errMsg) {
    if (errMsg) {
        console.error(errMsg);
        return;
    }
    console.log('Download complete! Saved at ' + destinationDir);
})
