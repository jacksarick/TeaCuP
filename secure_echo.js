/*
This is a simple test of tls. It's just an echo server over tls. To connect from the command line, use:
	penssl s_client -connect [host]:[port]
or equivalent.
*/

var tls = require('tls');
var fs = require('fs');

var options = {
	key: fs.readFileSync('cert/private-key.pem'),
  cert: fs.readFileSync('cert/public-cert.pem')
};

// What port to listen on
const port = 3334;

// Make the server
var server = tls.createServer(options, function (socket) {
	
	// When the client connects, say hi
	socket.write("welcome");

	// When client sends data
	socket.on('data', function(data) {
		socket.write("You said: " + data.toString());
	});

	// When client leaves
	socket.on('end', function() {
		console.log(token + " logged out");
	});

	// When socket gets errors
	socket.on('error', function(error) {
		socket.write("error");
	});
});


// Tell the server to listen on specified port
server.listen(port, function() {
	console.log("Server listening at localhost on port " + port);
});