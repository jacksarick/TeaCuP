'use strict';

utils = {
	// Generate a token, a random string, of n length
	token: function(n) { return Math.random().toString(36).substr(2, n+2); },
}

module.exports = utils;