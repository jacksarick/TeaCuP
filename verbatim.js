#!/usr/local/bin/node

var net = require('net');

var config = require("config.json")

var server = net.createServer(function(socket) {

	// Log it to the server output
	console.log("New socket with " + socket.name);

	// Welcome user to the socket
	socket.write("{'status':'connected'}");


	// When client sends data
	socket.on('data', function(data) {
		var msg = data.toString().replace(/[^\d]/g, "");
		var response = "{'data':" + (msg*socket.name) + "}";
		console.log(id ": " + msg +" => "+ response)
		socket.write(response);
	});


	// When client leaves
	socket.on('end', function() {
		// Log it to the server output
		console.log("User " + socket.name + " left");
	});

	// When socket gets errors
	socket.on('error', function(error) {
		console.log('Socket Error: ', error.message);
	});
});


// Listening for any problems with the server
server.on('error', function(error) {
	console.log("Error: ", error.message);
});

// Listen on the port
server.listen(port, function() {
	console.log("Server listening at localhost on port " + port);
});