const Book = require('../src/book');
const router = require('express').Router();

router.get('/', (req, res, next) => {
	if(req.accepts(['html', 'json']) === 'html') return res.render('app');

	Book.searchBooks(req.query)
});
