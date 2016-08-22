#!/usr/local/bin/node

var net    = require('net');
var config = require("./config.json");
var req    = require("./js/request.js");
var utils  = require("./js/utils.js");
var error  = require("./js/error.js")

// Simple functions
contain = function (array, value) { return array.indexOf(value) > -1 }

var server = net.createServer(function(socket) {
	var socket;

	// Log opening to output
	console.log("Opened new socket");

	// Welcome user to the socket
	socket.write("{'status':'connected'}\n");

	// Custom write function
	socket.send = function(data) {
		socket.write(JSON.stringify(data) + "\n");
	}


	// When client sends data
	socket.on('data', function(data) {
		var response = {};

		data = utils.convert(data, function() {error.warn("failed to parse")});

		try {
			// If the user can't access the table, let them know
			if (!contain(socket.tables, data.table)) {
				socket.end(req.error("access denied"));
			}

			// If the user can access the table, proceed
			else{
				//TODO: Make new table if one does not exist
				var table_name = config.db + data.table + ".json";
				var table = require(table_name);

				// If they are getting data
				if (data.req === "get"){
					response.status = 'success';
					response.data = req.get(table, data.query, data.filter);
				}

				// If they are putting data
				if (data.req === "put") {
					response.status = req.put(table, data.token, data.query, data.val, table_name);
				}

				// If they are checking out a table
				if (data.req === "checkout"){
					response.status = req.checkout(table, data.token)
				}

				// If they are checking in a table
				if (data.req === "checkin"){
					response.status = req.checkin(table, data.token)
				}

				// Unsupported request
				// else {
				// 	socket.end(req.error("unsupported request"));
				// }
			}
		}

		// Generic failure
		catch(err){
			socket.end(req.error("generic failure"));
		}

		socket.send(response);
	});


	// When client leaves
	socket.on('end', function() {
		// Log it to the server output
		console.log("User " + socket.name + " checked out")
		console.log("Socket closed");
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
server.listen(config.port, function() {
	console.log("Server listening at localhost on port " + config.port);
});