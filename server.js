#!/usr/local/bin/nodemon --use-strict
// This shebang is the one I use for development, it should not be recomended for deployment

// I use 'use strict' because it enforces good programming habits.
// As it only applies to the file it is, I run the server with the --use-strict flag, which applies it to all files run.
'use strict';

// The first thing we import is logs, so that if something goes wrong right away, we know.
const log = require("./js/log.js");

// The configuration for the server
const config = require("./config.json").server;

// Our actual app. The server just acts as a connection mechanism
var app = require("./app.js");

// There are two servers we can make, tcp or tls. tls is secure, tcp isn't
// If the config is set up for tls, use it
if (config.secure){
	// First, get the certs.
	// fs is a a library to read local files
	const fs  = require('fs');

	// Read our cert and key from the file
	const options = {
		key: fs.readFileSync(config.ssl.key),
		cert: fs.readFileSync(config.ssl.cert)
	};

	// tls is the secure library
	const tls = require('tls');

	// Create a server with our cert and key
	var server = tls.createServer(options, app);
}

// If they don't, use tcp
else {
	// Import the "net" library, and make a server with it
	const net = require('net');
	var server = net.createServer(app);
}

// Listening for any problems with the server
server.on('error', function(error) {
	log.warn(error);
});

// Tell the server to listen on specified port
server.listen(config.port, function() {
	log.server("Server listening at localhost on port " + config.port);
});