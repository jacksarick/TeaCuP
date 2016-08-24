#!/usr/local/bin/node

// These libraries are imported as const. We will use them, but if they are changed it is an error.
const net    = require('net');
const config = require("./config.json");
const utils  = require("./js/utils.js");
const log    = require("./js/log.js");

// The library changes based on socket connection, therefore it is variable
var response = require("./js/response.js");

var server = net.createServer(function(socket) {
	// Initiate socket
	response.socket = socket;

	// Give the user a token, and greet them
	const token = utils.token(10);
	response.send("connected");
	log.info(token + " logged in");

	// When client sends data
	socket.on('data', function(data) {
		data = response.parse(data);
		var cmd = response.command(data);
		response.send(cmd(data));
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