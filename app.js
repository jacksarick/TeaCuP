// These libraries are imported as const. We will use them, but if they are changed it is an error.
const log  = require("./js/log.js");
const file = require("./js/file.js");

// The library changes based on socket connection, therefore it is variable
var response = require("./js/response.js");

// // Load our database. (It's hardcoded for now with random data)
// var database = {"names":{"john":30,"stacy":34,"joe":16,"carol":21},"numbers":[78,179,132,182,12,9],"default":true};

// // Link the database to the response library
// response.db = database;

function app(socket) {
	// Initiate socket
	response.socket = socket;

	// Give the user a token, a local array, and greet them
	const token = Math.random().toString(36).substr(2, 12);
	var array = {};
	response.send("connected");
	log.info(token + " logged in");

	// When client sends data
	socket.on('data', function(data) {
		// Parse the data to a string
		data = response.parse(data);

		// Interperet what command it was
		var cmd = response.command(data);
		
		// Log what came in
		log.info(token + " <= " + data);

		// Run command, collect result
		var output = cmd(data);

		// Send the command to the user

		// Send the command to the user and log it, but if there is actually something to log.
		if (output != undefined){
			response.send(output);
			log.info(token + " => " + output);
		}

	});

	// When client leaves
	socket.on('end', function() {
		log.info(token + " logged out");
	});

	// When socket gets errors
	socket.on('error', function(error) {
		response.write("error");
	});
}

module.exports = app;