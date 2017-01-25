const router = require('express').Router();

router.delete('/:id', (req, res, next) => {
	/*
		TODO permission check
		TODO csrf check
		TODO delete user
	*/
});

router.patch('/:id', (req, res, next) => {
	/*
		TODO permission check
		TODO csrf check
		TODO update user
	*/
});

router.get('/:id', (req, res, next) => {
	if(req.accepts(['html', 'json']) === 'html'){
		return res.render('app');
	}
	/*
		TODO Show user information
	*/
});

module.exports = router;
