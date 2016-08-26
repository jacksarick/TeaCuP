var tls = require('tls'),
	fs = require('fs'),
	msg = "hello world!";

var options = {
	key: fs.readFileSync('cert/private-key.pem'),
  cert: fs.readFileSync('cet.public-cert.pem')
};

tls.createServer(options, function (socket) {
	socket.write(msg+"\n");
	socket.pipe(socket);
}).listen(3334);