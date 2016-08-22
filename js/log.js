colour = function(clr, string) {
	colours = {
		"red"	: "\x1b[31m",
		"yellow": "\x1b[33m",
		"blue"	: "\x1b[34m",
		"green"	: "\x1b[32m"
	}

	return colours[clr] + string + "\x1b[0m"
}

log = {
	server: function(msg) {
		console.log(colour("blue", msg));
	},

	warn: function(msg) {
		console.log(colour("yellow", msg));
	},

	fail: function(msg) {
		console.log(colour("red", msg));
	},
}

module.exports = log;