const debug = require('debug')('bookcase:server');
const fs = require('fs');
const http = require('http');
const path = require('path');

const port = ((val) => {
	let port = parseInt(val, 10);

	if(isNaN(port)) return val;
	if(port >= 0) return port;
	return false;
})(process.env.PORT || '3000');

global.config = require('../server');

try{
	global.config['session-secret'] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'secret.json')))['session-secret'];
}catch(err){
	console.log('Generated Session Key!');
	global.config['session-secret'] = Math.random().toString(36).slice(2).split('').map((v) => (Math.random() < 0.5) ? v.toUpperCase() : v.toLowerCase()).join('');
	fs.writeFileSync(path.join(__dirname, '..', 'secret.json'), JSON.stringify({
		'session-secret': global.config['session-secret']
	}, '\t'));
}

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(`mongodb://${config.db.address}:${config.db.port}/${config.db.name}`, (err, client) => {
	if(err){
		console.error(err);
		return;
	}
	
	global.db = client;

	const app = require('./app');
	app.set('port', port);

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
