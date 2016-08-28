// The configuration file for the database
const config = require("../config.json").database;

// Reading in files is normally 25% of my error logs, so this library is getting imported ASAP
const log = require("./log.js");

// The built-in node library for interacting with local files
const fs = require("fs");

// This will be our function for encrypting and decrypting data
const crypto = require("./encrypt.js");

var IO = {
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

	open: function(file){
		return fs.readFileSync(config.root + file + ".tea").toString();
	},

	read: function(pass, file) {
		const data = this.convert(crypto.decrypt(pass, this.open(file)));

		if (!data) return false;
		
		return data;
	}
};

module.exports = IO;