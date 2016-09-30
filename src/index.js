var app = require('./app');
var debug = require('debug')('bookcase:server');
var fs = require('fs');
var http = require('http');

var port = ((val) => {
	var port = parseInt(val, 10);

	if(isNaN(port)) return val;
	if(port >= 0) return port;
	return false;
})(process.env.PORT || '3000');

app.set('port', port);

global.config = require('../server');
global.translator = require('./translator');

MongoClient.connect(`mongodb://${config.db.address}:${config.db.port}/${config.db.name}`, (err, client) => {
	global.mongo = client;
	global.server = http.createServer(app);

	server.listen(port);
	server.on('error', (error) => {
		if(error.syscall !== 'listen') throw error;

		let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

		switch(error.code){
			case 'EACCES':
				console.error(bind + ' requires elevated privileges');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(bind + ' is already in use');
				process.exit(1);
				break;
			default:
				throw error;
		}
	});

	server.on('listening', () => {
		let addr = server.address();
		let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
		debug('Listening on ' + bind);
	});
});
