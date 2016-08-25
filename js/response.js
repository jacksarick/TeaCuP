// We need the log library
const log = require("./log.js");

// Basic method for testing if a list contains a value
Array.prototype.contains = function (value) { return this.indexOf(value) > -1 };

// Basic method for testing if an object contains a key
Object.prototype.has = function (key) { return this[key] != undefined };

const clean = function(string) {
	var r = string.split(":");
	r = r.slice(1, r.length).join(":");
	return r;
}

// Dictionary of all commands for the client
var dict = {
	VAR: function(key) {
		return JSON.stringify(response.db[clean(key)]);
	},

	ECHO: function(d) {
		// Send off a cleaned version of the text
		response.send(clean(d));

		// Record what we sent
		return clean(d);
	},

	BYE: function() {
		response.socket.end("disconnected");
	},
};

var response = {
	// This will be our basic function that only sends data.
	send: function(msg) {
		this.socket.write(msg + "\n");
	},

	// A slightly more advanced function that also logs it
	write: function(msg) {
		this.send(msg);
		log.info(msg);
	},

	// Return the command, or lack thereof
	command: function(data) {
		var cmd = data.split(":")[0].toUpperCase();

		// If the command is in the dictionary...
		if (dict.has(cmd)){
			// Return the associated function
			return dict[cmd];
		}

		// If no command is found, return an empty function, so not to break anything
		else {
			return function() {};
		}
	},

	// Parse incoming data
	parse: function(data) {
		return data.toString().trim();
	}
}

module.exports = response;