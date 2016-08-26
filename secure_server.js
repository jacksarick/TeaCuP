var tls = require('tls'),
	fs = require('fs'),
	msg = "hellow world!";

var options = {
	key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('public-cert.pem')
};

tls.createServer(options, function (socket) {
	socket.write(msg+"\n");
	socket.pipe(socket);
}).listen(3334);