const router = require('express').Router();

router.get('/:id/:volume', (req, res, next) => {
	/*
		TODO Check for id existence. (if not, reject)
		TODO Check for volume existence. (if not, reject)
		TODO Make a zip stream and pipe it to response
	*/
});

module.exports = router;
