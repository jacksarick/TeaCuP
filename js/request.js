var fs = require('fs');
var config = require("../config.json");

function find(data, path) {
	/* 
	Context: Given a JS object and a string, return as if string was an eval
	Example: find({"names": {"john":5, "stacy":34}}, ["names", "john"]) => 5}

	This is actually a cool little piece of code IMO. The recursion loops through each argument and applys them one by one to the data
	*/
	if (path.length === 0){
		return data;
	}

	return find(data[path.shift()], path);
}

function update(data, path, value) {
	// Pretty much the same as GET, but returns full lists, and returns the new value instead of the actual
	if (path.length === 1){
		data[path[0]] = value;
		return data;
	}

	data[path[0]] = update(data[path.shift()], path, value);
	return data;
}

function write(file, data) {
	fs.writeFile(file, JSON.stringify(data), function (err) {
		if (err){ console.log(err) }
	});
}

// List of tables that are checked out
var checkout = {};

request = {

	error: function (msg) {
		return JSON.stringify({'status': 'error', "data": msg});
	},


	// Get request
	get: function(table, query, fn) {
		// If it's just a table, they want a table.
		if (query === undefined) {
			return table;
		}

		// If they included a filer, find and apply
		if (fn != undefined) {
			func = eval("f = " + fn);
			return find(table, query).filter(func);
		}

		// Else, they have the want a query
		else {
			return find(table, query);
		}
	},

	// Put request
	put: function(table, token, query, val, name) {
		if (!checkout[table]){
			return "table not checked out";
		}

		if (checkout[table] != token){
			return "table has been checked out";
		}

		else{
			if (table === undefined ||
				query === undefined ||
				val === undefined) {
				return "bad query";
			}

			else {
				data = update(table, query, val);
				write(name, data);
				return "sucess";

			}
		}
	},

	// Checkout request
	checkout: function(table, token) {
		//If it's not taken (false or undefined)
		if (!checkout[table]){
			// Set it to the user's token
			checkout[table] = token;
			return "sucess";
		}

		// Else, it's taken, so tell the user
		else {
			return "table checked out";
		}
	},

	// Checkin request
	checkin: function(table, token) {
		//If it's not taken (false or undefined)
		if (!checkout[table]){
			return "table not checked out";
		}

		// If the user's token works, let them know
		if (checkout[table] === token){
			checkout[table] = false;
			return "sucess";
		}

		// Else, tell user they failed
		else {
			return "token table mismatch";
		}
	}
}

module.exports = request;