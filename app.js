var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const socketIO = require('socket.io');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin')
var app = express();
const server = http.createServer(app);
const io = socketIO(server);
var ip = require  ('ip');
var express_rate_limiter = require('express-rate-limit');
const cors = require ('cors');


var limiter = express_rate_limiter({
  windowMs: 8 * 60 * 1000, // 8 minutes
  max: 1000, // Max requests per windowMs
  message: 'Too many requests, please try again later.',
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true)

app.use(logger('short'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use (limiter)

app.use(session({ 
  secret: 'cats', 
  resave: false, 
  saveUninitialized: false,
  cookie : {maxAge : 2 * 60 * 60 * 1000 } }));  // 2 hrs 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.set('socketio', io);
app.use (cors());


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // console.log (err);
  res.render('error');
});

module.exports = app;