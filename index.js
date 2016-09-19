const path = require('path');
const express = require('express');

const logger = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

let app = express();
app.set('view engine', 'pug');
app.set('port', process.env.PORT || '6969');

app.use(logger('dev'));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '7d' }));

app.listen(app.get('port'), () => console.log('Listening on port', app.get('port')));
i
