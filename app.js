// These libraries are imported as const. We will use them, but if they are changed it is an error.
const log  = require("./js/log.js");
const file = require("./js/file.js");

function app(socket) {
	// The library changes based on socket connection, therefore it is variable
	var response = Object.create(require("./js/response.js"));

	// Initiate socket
	response.socket = socket;

	// Give the user a token, a list of tables, and greet them
	const token = Math.random().toString(36).substr(2, 12);
	socket.tables = [];
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