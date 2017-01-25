const router = require('express').Router();

router.get('/:id/:volume', (req, res, next) => {
	if(req.accepts(['html', 'json']) === 'html'){
		return res.render('app');
	}

	/*
		TODO Show volume info (Title, Volume, Author, Tags)
		TODO send pages
	*/
});

module.exports = router;
