const router = require('express').Router();

router.get('/:id/:volume', (req, res, next) => {
	/*
		TODO Show volume info (Title, Volume, Author, Tags)
	*/
	res.render('app');
});

module.exports = router;
