//read the .env
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//Handlebars
const hbs = require('express-handlebars');
//Passport
const passport = require('passport');
//Cookies-session
const cookieSession = require('cookie-session');
//Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');

//call the dotenv
require('./config/passport');

const app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//Handle hbs
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'Layout', layoutsDir: __dirname + '/views/Layouts'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Cookies-sesion
app.use(cookieSession({
  name: 'session',
  keys: ['key1, key2']
}));
//Passport
app.use(passport.initialize());
app.use(passport.session());
//Access to folder content of routes
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/', usersRouter);
app.use('/', indexRouter);


/**
 * app.use(function(req, res, next) {
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
 */
// catch 404 and forward to error handler


module.exports = app;
