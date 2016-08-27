// The built-in node library for interacting with local files
const fs = require("fs");

// Reading in files is normally 25% of my error logs.
const log   = require("./log.js");

var file = {
	convert: function(data) {
		try {
			// If it all goes well, just return the data
			return JSON.parse(data);
		}

		catch(err) {
			// If it goes bottom up, log it...
			log.fail(err);

			// ...and return a failure
			return false;
		}
	},

	read: function(file){
		return this.convert(fs.readFileSync(file));
	}
};