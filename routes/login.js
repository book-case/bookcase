const router = require('express').Router();

router.get('/', (req, res, next) => {
	res.render('app');
});

router.post('/', (req, res, next) => {
	/*
		TODO check forms and login, update session
	*/
});

module.exports = router;
