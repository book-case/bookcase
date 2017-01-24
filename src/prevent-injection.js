var async = require('async');

module.exports = (req, resp, next) => {
	var checkValue = (v, cb) => {
		if(typeof v === 'boolean') v = (v ? 1 : 0);
		return (typeof v === 'string' || typeof v === 'number') ? v : '';
	};
	//Anti SQL Injection\
	['body', 'query', 'params', 'cookies'].forEach((k) => {
		Object.keys(req[k]).forEach((_k) => {
			req[k][_k] = checkValue(req[k][_k]);
		});
	});

	next();
};
