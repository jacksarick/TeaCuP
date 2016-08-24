'use strict';

colour = function(clr, string) {
	colours = {
		"red"	: "\x1b[31m",
		"yellow": "\x1b[33m",
		"blue"	: "\x1b[34m",
		"green"	: "\x1b[32m"
	}

	return colours[clr] + string + "\x1b[0m"
}

function print(msg) {
	console.log(msg);
}

log = {
	info: function(msg) {
		print(msg);
	},

	server: function(msg) {
		print(colour("blue", msg));
	},

	warn: function(msg) {
		print(colour("yellow", msg));
	},

	fail: function(msg) {
		print(colour("red", msg));
	},
}

module.exports = log;