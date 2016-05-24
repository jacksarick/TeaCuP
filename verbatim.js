#!/usr/local/bin/node

var net = require('net');
var config = require("./config.json");

contain = function (array, value) { return array.indexOf(value) > -1 }

var error = "{'status': 'error'}";
var sucess = "{'status': 'sucess'";

function authenticate(data) {
	// If the user's authentication checks out
	if (data.user != undefined &&
		data.pass != undefined &&
		config.users[data.user] != undefined &&
		config.users[data.user].pass == data.pass) {

		return config.users[data.user]["tables"];
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
	socket.write("{'status':'connected'}");


	// When client sends data
	socket.on('data', function(data) {
		data = data.toString();

		// Try to convert data to JSON
		try	{
			data = JSON.parse(data);
		}

		// If we fail, let the user know
		catch(err) {
			socket.write(error);
			console.log("Request failed")
		}

		// If user is not authenticated...
		if(socket.tables.length < 1){
			socket.tables = authenticate(data);

			// if the can access tables, let them know
			if (socket.tables.length > 0) {
				var neat = JSON.stringify(socket.tables);
				socket.write(sucess + ", 'tables': " + neat + "}")
			}

			// If the user has no tables, bye bye
			else {
				socket.end(error);
			}
		}

		// Else...
		else {
			var response;

			try {
				if (!contain(socket.tables, data.table)) {
					response = error;
				}
				else {

					var table = require(data.table);
					response = sucess + ", "

					if (data.query != undefined) {
						response += query(data.query, );
					}

					else {
						return JSON.stringify(require("./" + data.table));
					}
				}
			}

			console.log(id + ": " + msg +" => "+ response)

			socket.write(response);
		}
	});


	// When client leaves
	socket.on('end', function() {
		// Log it to the server output
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