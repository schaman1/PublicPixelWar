var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid').router;
var loginRouter = require('./routes/login');

const { router: utilsRouter, setSocketIo: setUtilsIo } = require('./routes/utils');

var googleRouter = require('./routes/google');
var waitingRouter = require('./routes/waiting');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


var cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000','https://pixelchallenge.up.railway.app'], // Autoriser ces origines
  methods: ['GET', 'POST'], // Autoriser uniquement certaines méthodes HTTP
  credentials: true // Autoriser l'envoi de cookies
}));//pour bibi car pbl

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', gridRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/utils', utilsRouter)
app.use('/google', googleRouter);
app.use('/waiting', waitingRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
