function find(data, args) {
	/* 
	Context: Given a JS object and a string, return as if string was an eval
	Example: find({"names": {"john":5, "stacy":34}}, "names.john") => 5

	This is actually a cool little piece of code IMO. The recursion loops through each argument and applys them one by one to the data 
	*/
	if (args.length < 1){
		return data;
	}

	return flatten(data[args.shift()], args);
}

request = {

	error: function (msg) {
		return {'status': 'error', "data": msg} 
	},


	// Get request
	get: function(table, query) {
		if (query != undefined) {
			//TODO: Make queries
			return table;
		}

		else {
			return table;
		}
	},

	// Put request
	put: function(table, query) {
		if (query === undefined || query.length != 2) {
			return error("bad query");
		}

		else {

			return table;
		}
	}
}

module.exports = request;