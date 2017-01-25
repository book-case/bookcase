const path = require('path');
const multer = require('multer');
const supportsMime = {
	'image/png': 'png',
	'image/gif': 'gif',
	'image/bmp': 'bmp',
	'image/jpeg': 'jpg'
};
const numericCheck = /^\d+$/;

const router = require('express').Router();
const upload = multer({
	storage: multer.diskStorage({
		filename: (req, file, cb) => {
			let extension = supportsMime[file.mimetype];
			if(typeof extension !== 'string') extension = 'dat';

			cb(null, `${Date.now()}.${extension}`);
		},

		destination: (req, file, cb) => {
			cb(null, path.resolve(__dirname, '..', 'tmp', 'uploads'));
		}
	})
});

router.put('/', (req, res, next) => {
	/*
		TODO create a new book and return id
	*/
});

router.put('/:id/:volume', (req, res, next) => {
	let isSlug = !numericCheck.test(req.params.id);
	/*
		TODO check for id existence. (if not, reject it)
		TODO check for volume existence. (if exists, reject it)
	*/
});

router.put('/:id/:volume/:page', upload.single('page'), (req, res, next) => {
	/*
		TODO check for id existence. (if not, reject it)
		TODO check for volume existence. (if not, reject it)
		TODO check for page existence. (if exists, reject it)
	*/
});

router.patch('/:id', (req, res, next) => {
	/*
		TODO permission check
		TODO update book
	*/
});

router.patch('/:id/:volume', (req, res, next) => {
	/*
		TODO permission check
		TODO update volume
	*/
});

router.delete('/:id/:volume', (req, res, next) => {
	/*
		TODO permission check
		TODO if no volume exists, automatically delete the book.
	*/
});

router.delete('/:id/:volume/:page', (req, res, next) => {
	/*
		TODO permission check
	*/
});

router.get('/:id', (req, res, next) => {
	if(req.accepts(['html', 'json']) === 'html'){
		return res.render('app');
	}
	/*
		TODO Show volumes(editions)
		TODO if the book only has 1 volume, redirect to the volume
	*/
});

router.get('/:id/:volume', (req, res, next) => {
	if(req.accepts(['html', 'json']) === 'html'){
		return res.render('app');
	}
	/*
		TODO Show volume info (Title, Volume, Author, Tags, Language)
	*/
});

router.get('/:id/:volume/download', (req, res, next) => {

});

module.exports = router;
