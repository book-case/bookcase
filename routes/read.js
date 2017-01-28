const router = require('express').Router();

router.get('/:id/:volume', (req, res, next) => {
	res.render('app');
});

module.exports = router;
