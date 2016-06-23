function find(data, args) {
	/* 
	Context: Given a JS object and a string, return as if string was an eval
	Example: find({"names": {"john":5, "stacy":34}}, ["names", "john"]) => 5}

	This is actually a cool little piece of code IMO. The recursion loops through each argument and applys them one by one to the data 
	*/
	if (args.length === 0){
		return data;
	}

	return find(data[args.shift()], args);
}


// List of tables that are checked out
var checkout = {};

request = {

	error: function (msg) {
		return {'status': 'error', "data": msg} 
	},


	// Get request
	get: function(table, query, val) {
		// If it's just a table, they want a table.
		if (query === undefined) {
			return table;
		}

		// If they included a filer, find and apply
		if (val != undefined) {
			// Just converts String -> Function
			var fn_val = new Function("x", "return " + val);
			return find(table, query).filter(fn_val);
		}

		// Else, they have the want a query
		else {
			return find(table, query);
		}
	},

	// Put request
	put: function(table, query) {
		if (query === undefined || query.length != 2) {
			return error("bad query");
		}

		else {
			//REUSE FIND CODE WITH SET. every level "equals" the next, until we hit path, then equals to args
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