const Book = require('../src/book');
const path = require('path');
const multer = require('multer');
const supportsMime = {
	'image/png': 'png',
	'image/gif': 'gif',
	'image/bmp': 'bmp',
	'image/jpeg': 'jpg'
};

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
	const user = res.locals.verifyUser();
	if(!user) return res.status(403).json({
		success: false,
		reason: 'not_logged_in'
	});

	Book.createBook(
		req.query.name,
		req.query.author,
		req.query.language,
		req.query.tags,
		user
	).then((v) => {
		res.status(200).json({
			success: true,
			id: v.id
		});
	}).catch((err) => {
		res.status(500).json({
			success: false,
			reason: 'internal_server'
		});
	});
});

router.put('/:id/:volume', (req, res, next) => {
	const user = res.locals.verifyUser();

	if(!user) return res.status(403).json({
		success: false,
		reason: 'not_logged_in'
	});

	Book.getBook(req.params.id).then((v) => {
		if(!v){
			return res.status(403).json({
				success: false,
				reason: 'book_exists'
			});
		}

		let result = v.createVolume(req.params.volume, req.query.tags, user);
		if(result){
			res.status(200).json({
				success: true
			});
		}else{
			res.status(403).json({
				success: false,
				reason: 'volume_exists'
			});
		}
	});
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

router.delete('/:id', (req, res, next) => {
	//TODO permission check
	//TODO check if no volume exists
});

router.delete('/:id/:volume', (req, res, next) => {
	/*
		TODO permission check
	*/
});

router.delete('/:id/:volume/:page', (req, res, next) => {
	/*
		TODO permission check
	*/
});

router.get('/:id', (req, res, next) => {
	if(req.accepts(['html', 'json']) === 'html'){
		/*
			TODO if the book only has 1 volume, redirect to the volume
		*/
		return res.render('app');
	}
	/*
		TODO Show book info (Name, Author, Language, Tags, Volumes)
	*/
});

router.get('/:id/:volume', (req, res, next) => {
	if(req.accepts(['html', 'json']) === 'html'){
		return res.render('app');
	}
	/*
		TODO Show volume info (Parent Book Id, Volume, Tags, Pages)
	*/
});

module.exports = router;
