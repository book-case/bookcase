const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');
const preventInjection = require('./prevent-injection');
const requestLanguage = require('express-request-language');
const session = require('express-session');
const translator = require('./translator');
const verifyUser = require('./verify-user');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

const app = express();

const MongoStore = require('connect-mongo')(session);
const sess = {
	secret: global.config['session-secret'],
	resave: false,
	saveUninitialized: true,
	cookie: {},
	store: new MongoStore({
		db: global.db
	})
};

if (app.get('env') === 'production') {
	app.set('trust proxy', 1);
	sess.cookie.secure = true;
}

app.set('view engine', 'hbs');
app.set('port', process.env.PORT || '6969');

app.use(logger('dev'));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(session(sess));

app.use(preventInjection);
app.use(requestLanguage({
	languages: (global.config && global.config.langs) ? global.config.langs : ['en-US']
}));
app.use(translator);

if((process.env.NODE_ENV || 'development') === 'development'){
	app.use(webpackMiddleware(webpack(require('../webpack.config.js')), {
		publicPath: '/dist/'
	}));
}

app.use('/dist', express.static(path.join(__dirname, 'dist'), {
	maxAge: '7d'
}));

app.use(verifyUser);

app.use('/', require('../routes'));
app.use('/book', require('../routes/book'));
app.use('/image', require('../routes/image'));
app.use('/login', require('../routes/login'));
app.use('/signup', require('../routes/signup'));
app.use('/tags', require('../routes/tags'));
app.use('/user', require('../routes/user'));

app.use((req, res, next) => {
	if(req.accepts('html')){
		res.status(404).render('app');
		return;
	}

	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	if(!err.status){
		console.error(err);
		err = new Error("Internal Server");
		err.status = 500;
	}

	res.status(err.status);

	res.render('error', {
		err: err.message,
		errno: err.status
	});
});

module.exports = app;
