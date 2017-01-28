const Book = require('../src/book');
const router = require('express').Router();

router.get('/', (req, res, next) => {
	if(req.accepts(['html', 'json']) === 'html') return res.render('app');

	Book.searchBooks(req.query.q, req.query.lang, req.query.tags, req.query.page, req.query.amount).then((v) => {
		v.success = true;
		res.status(200).json(v);
	}).catch((err) => {
		res.status(500).json({
			success: false,
			reason: 'internal_server'
		});
	});
});

module.exports = router;
