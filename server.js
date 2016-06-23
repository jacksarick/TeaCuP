#!/usr/local/bin/node

var net = require('net');
var config = require("./config.json");
var req = require("./request.js")

// Simple functions
contain = function (array, value) { return array.indexOf(value) > -1 }

function authenticate(data) {
	// If the user's authentication checks out
	// TODO: No plaintext passwords
	if (data.user != undefined &&
		data.pass != undefined &&
		config.users[data.user] != undefined &&
		config.users[data.user].pass === data.pass) {

		return [data.user, config.users[data.user]["tables"]];
	}

	// Else, the user has access to nothing
	else {
		return [];
	}
}

var server = net.createServer(function(socket) {
	// Default access is no tables
	socket.tables = [];

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

		data = data.toString();

		// Try to convert data to JSON
		try	{
			data = JSON.parse(data);
		}

		// If we fail, let the user know
		catch(err) {
			socket.write(req.error("could not parse request"));
		}

		// If user is not authenticated...
		if(socket.tables.length < 1){
			var auth = authenticate(data)
			socket.name = auth[0];
			socket.tables = auth[1];
			console.log("User " + socket.name + " checked in");


			// if the can access tables, let them know
			if (socket.tables.length > 0) {
				response.status = "success";
				response.tables = socket.tables;
				socket.send(response);
			}

			// If the user has no tables, bye bye
			else {
				socket.end(req.error("authentication failed"));
			}
		}

		// If user is authenticated...
		else {
			try {
				// If the user can't access the table, let them know
				if (!contain(socket.tables, data.table)) {
					response = req.error("access denied");
				}

				// If the user can access the table, proceed
				else{
					//TODO: Make new table if one does not exist
					var table = require(config.db + data.table + ".json");

					// If they are getting data
					if (data.req === "get"){
						response.status = 'success';
						response.data = req.get(table, data.query, data.filter);
					}

					// If they are putting data
					if (data.req === "put") {
						response = req.put(table, data.query);
					}

					if (data.req === "checkout"){
						response.status = req.checkout(table, data.token)
					}

					if (data.req === "checkin"){
						response.status = req.checkin(table, data.token)
					}

					// Unsupported request
					// else {
					// 	response = req.error("unsupported request");
					// }
				}
			}

			// Generic failure
			catch(err){
				response = req.error("generic failure");
			}

			socket.send(response);
		}
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
