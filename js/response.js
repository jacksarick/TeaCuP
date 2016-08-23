var log  = require("./log.js");

response = {
	send: function(msg) {
		this.socket.write(msg + "\n");
	},

	write: function(msg) {
		this.send(msg);
		log.info(msg);
	},

	parse: function(data) {
		return data.toString().trim();
	}
}

module.exports = response;