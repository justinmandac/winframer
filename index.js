/**
 * @fileoverview Initializes a Windows Framer project at a specified directory.
*/
const options = require('./args.js');
const config = require('./config.js');
// Download dependencies
const fs = require('fs');
const https = require('https');
// Display command line arguments
const destinationDir = options['dir']
const doesUpdate = options['update'];
const fileName = 'Framer.zip';

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(dest);
        https.get(url, (response) => {
          stream.on('finish', _ => resolve())
          .on('error', err => {
              fs.unlink(dest);
              reject(err.message);
          });
        });
    });
};

if (doesUpdate) {
    console.log('Downloading Framer.zip');
    download(config.SRC_URL, `./${fileName}`).catch(msg => {
        if (msg) {
            console.error(msg);
            return;
        }
    })
} else {
    console.log('using stored file.');
}