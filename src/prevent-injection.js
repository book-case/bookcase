var async = require('async');

module.exports = (req, resp, next) => {
	var checkValue = (v, cb) => {
		if(typeof v === 'boolean') v = (v ? 1 : 0);
		cb(null, (typeof v === 'string' || typeof v === 'number') ? v : '');
	};
	//Anti SQL Injection
	async.each(['body', 'query', 'params', 'cookies'], (k, cb) => {
		async.map(req[k], checkValue, (err, res) => {
			req[k] = res;
		});
	}, (err) => {
		next();
	});
};
