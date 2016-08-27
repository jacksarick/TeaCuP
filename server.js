#!/usr/local/bin/node
'use strict';

// The only libraries we need are net and log. 
// Everything else is imported with app.js
const net 	 = require('net');
const log    = require("./js/log.js");

// The configuration for the server
const config = require("./config.json");

// Our actual app. The server just acts as a connection mechanism
var app = require("./app.js");

var server = net.createServer(app);

// Listening for any problems with the server
server.on('error', function(error) {
	log.warn(error);
});

// Listen on the port
server.listen(config.port, function() {
	log.server("Server listening at localhost on port " + config.port);
});