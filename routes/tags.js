const router = require('express').Router();

router.get('/', (req, res, next) => {
	if(req.accepts(['html', 'json']) === 'html') return res.render('app');
	/*
		TODO send tags and book counts of tag.
	*/
});

module.exports = router;
