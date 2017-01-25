const router = require('express').Router();

router.get('/', (req, res, next) => {
	res.render('app');
});

router.post('/', (req, res, next) => {
	/*
		TODO sanitize forms, if registration is allowed, register a user
	*/
});

module.exports = router;
