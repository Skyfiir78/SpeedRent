var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//logic app
require('./models/Car');
require('./models/User');
require('./config/passport');
app.use(require('./routes'));

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
  res.json({
      message: err.message,
      error: err
  });
});

mongoose.connect('mongodb://localhost/speed_rent', { useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

module.exports = app;
