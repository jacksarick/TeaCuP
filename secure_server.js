#!/usr/local/bin/nodemon --use-strict
// This shebang is the one I use for development, it should not be recomended for deployment

// We use tls instead of net, and we need fs to read our certs
const tls = require('tls');
const fs  = require('fs');
const log = require("./js/log.js");

// The configuration for the server
const config = require("./config.json").server;

// Read our cert and key from the file
const options = {
	key: fs.readFileSync(config.ssl.key),
	cert: fs.readFileSync(config.ssl.cert)
};

// Our actual app. The server just acts as a connection mechanism
var app = require("./app.js");

// Make the server.
// It's pretty much the same as last time, but now we have to include our cert and key
var server = tls.createServer(options, app);

// Listening for any problems with the server
server.on('error', function(error) {
	log.warn(error);
});

// Tell the server to listen on specified port
server.listen(config.port, function() {
	log.server("Server listening at localhost on port " + config.port);
});