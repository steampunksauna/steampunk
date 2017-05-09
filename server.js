var httpServer = require('http-server');

var server = httpServer.createServer({
	root: '.',
	cache: -1,
	robots: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true'
	}
});

server.listen(8080);
