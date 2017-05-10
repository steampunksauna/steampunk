var httpServer = require('http-server');
const port = 8080;

var server = httpServer.createServer({
	root: '.',
	cache: -1,
	robots: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true'
	}
});

server.listen(port, function() { console.log("Server listening on port", port)});
