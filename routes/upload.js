let router = require('express').Router();
let upload = require('multer')();

router.get('/', (req, res, next) => {
	res.render('upload');
});

router.get('/:id/:volume/', )

module.exports = router;
