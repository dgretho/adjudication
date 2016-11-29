var hello = require('./hello');
var $ = require('jquery');

var hellowWorld = hello + " World!";
$('<h1></h1>').text(hellowWorld).appendTo('body');