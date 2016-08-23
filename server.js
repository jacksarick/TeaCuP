#!/usr/local/bin/node

var net    = require('net');
var config = require("./config.json");
var utils  = require("./js/utils.js");
var log    = require("./js/log.js");
var response = require("./js/response.js");

var server = net.createServer(function(socket) {
	// Initiate socket
	response.socket = socket;

	// Give the user a token
	const token = utils.token(10);
	response.send("welcome\n");
	log.info(token + " logged in");

	// When client sends data
	socket.on('data', function(data) {
		data = response.parse(data);
		response.send("You said " + data);
		log.info(token + " <= " + data);

	});

	// When client leaves
	socket.on('end', function() {
		log.info(token + " logged out");
	});

	// When socket gets errors
	socket.on('error', function(error) {
		response.write("error");
	});
});

// Listening for any problems with the server
server.on('error', function(error) {
	log.warn(error);
});

// Listen on the port
server.listen(config.port, function() {
	log.server("Server listening at localhost on port " + config.port);
});