var log  = require("./log.js");

response = {
	write: function(msg) {
		this.socket.write(msg);
		console.log(msg);
	},

	server: function(msg) {
		console.log(utils.colour("blue", msg));
	},

	warn: function(msg) {
		console.log(utils.colour("yellow", msg));
	},

	fail: function(msg) {
		console.log(utils.colour("red", msg));
	},
}

module.exports = response;