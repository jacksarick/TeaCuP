// We need the log library, and the IO library
const log = require("./log.js");
const IO  = require("./file.js");
var  stat = require("")

// Basic method for testing if a list contains a value
Array.prototype.contains = function (value) { return this.indexOf(value) > -1 };

// Basic method for testing if an object contains a key
Object.prototype.has = function (key) { return this[key] != undefined };

// Function to clean up the input
function clean(string) {
	// split the string on each space
	let r = string.split(" ");

	// Take all except the first
	r = r.slice(1, r.length).join(" ");

	// return result
	return r;
}

// Function to pull data from a given path
function find(data, path) {
	// This is actually a cool little piece of code IMO. The recursion loops through each argument and applys them one by one to the data
	if (path.length === 0){
		return data;
	}

	return find(data[path.shift()], path);
}

// Function to change a var at the end of a path
function update(data, path, value) {
	// Pretty much the same as GET, but returns full lists, and returns the new value instead of the actual
	if (path.length === 1){
		data[path[0]] = value;
		return data;
	}

	data[path[0]] = update(data[path.shift()], path, value);
	return data;
}

// Dictionary of all commands for the client
var dict = {
	GET: function(key) {
		// We are going to split the key, then use it as a path to find a value in the database.
		let path = clean(key).split(".");

		// If the table isn't one the user has, fail
		if (!response.socket.tables.has(path[0])) return "failed";

		return JSON.stringify(find(response.db, path));
	},

	SET: function(input) {
		input = clean(input).split(" ")
		let key = input[0].split(".");
		let value = input.slice(1, input.length).join(" ");

		response.db = update(response.db, key, value);
		return key + " updated";

	},

	ECHO: function(d) {
		// Send the data sent
		return clean(d);
	},

	BYE: function() {
		// The termination will take priority over the return
		response.socket.end("disconnected");
	},

	LOAD: function(d) {
		d = clean(d).split(" ");

		let p = d[0],
			f = d.slice(1, d.length).join(" ");

		try {
			let table;

			try {
				table = IO.open(p, f);
			}

			catch(e) {
				return "no table named " + f;
			}

			if (!table) return "password failed"

			// If the database is not loaded, load it
			if (!response.db.has(f)) {
				response.db[f] = table;
			}
	
			// Add the table to the user's list
			response.socket.tables.push(f);

			// Tell the user it worked
			return f + " loaded";
		}

		catch(e) {
			log.fail(e);
			return "load failed";
		}
	}
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
		data = data.split(" ")[0].toUpperCase();

		// If the command is in the dictionary...
		if (dict.has(data)){
			// Return the associated function
			return dict[data];
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