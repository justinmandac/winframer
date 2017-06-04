/**
 * @fileoverview Extracts command line arguments and emits an
 * object.
*/
var commandLineArgs = require('command-line-args');
var commandLineOpts = [
    {name: 'dir', alias: 'd', type: String},
    {name: 'update', alias: 'u', type: Boolean}
];
module.export =  commandLineArgs(commandLineOpts);

