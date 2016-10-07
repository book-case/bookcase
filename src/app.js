const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const favicon = require('serve-favicon');
const logger = require('morgan');
const preventInjection = require('./prevent-injection');
const requestLanguage = require('express-request-language');
const translator = require('./translator');
const verifyUser = require('./verify-user');

let app = express();
app.set('view engine', 'pug');
app.set('port', process.env.PORT || '6969');

app.use(logger('dev'));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(preventInjection);
app.use(requestLanguage({
	languages: (global.config && global.config.langs) ? global.config.langs : ['en-US']
}));
app.use(translator);

app.use('/', require('../routes'));
//User-only zone
app.use(verifyUser);
app.use('/upload', require('../routes/upload'));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: '7d' }));

app.listen(app.get('port'), () => console.log('Listening on port', app.get('port')));

module.exports = app;
