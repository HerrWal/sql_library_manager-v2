var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Import the Sequelize models (from models/index.js)
var db = require('./models');
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();

// Sync database before starting the app

(async () => {
  await db.sequelize.sync({ force: false });
  try {
    await db.sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
}) ();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view cache', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = createError(404, 'Page not found');
  res.render('page_not_found', { error });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  err.message = err.message || `Something went wrong with the server!`
  console.log(`Error: ${res.status}, ${res.message}`);
  res.render('error', { err });
});

module.exports = app;