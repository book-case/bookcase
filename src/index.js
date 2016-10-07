const app = require('./app');
const debug = require('debug')('bookcase:server');
const fs = require('fs');
const http = require('http');

const port = ((val) => {
	let port = parseInt(val, 10);

	if(isNaN(port)) return val;
	if(port >= 0) return port;
	return false;
})(process.env.PORT || '3000');

app.set('port', port);

global.config = require('../server');

MongoClient.connect(`mongodb://${config.db.address}:${config.db.port}/${config.db.name}`, (err, client) => {
	global.db = client;
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
