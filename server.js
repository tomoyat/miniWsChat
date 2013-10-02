var fs = require('fs');
var ws = require('websocket.io');

var http = require('http').createServer(onRequest).listen(8888);
var server = ws.attach(http);


    
function onRequest(req, res) {
    fs.readFile(__dirname + '/index.html',
		function (err, data) {
		    if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		    }
		    res.writeHead(200, {"Content-Type": "text/html"});
		    res.end(data);
		} );
};



server.on('connection', function (socket) { 
    console.log('in!');
    socket.on('message', function (data) {
	server.clients.forEach(function(client) {
	    client.send(data);
	});
    });
    socket.on('close', function () {
	console.log('out!');
    });
});
