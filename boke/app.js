var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var Store = require('express-mysql-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('./middle/allowCors');
var mysqlConfig = require('./mysql/config');
require('./mysql/index');


var loginRouter = require('./routes/login');
var articleRouter = require('./routes/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  name: 'elm', // 设置 cookie 中保存 session id 的字段名称
  secret: 'elm', // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: 7200000// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new Store(mysqlConfig)// 将 session 存储到数据库中
}))
app.use(logger('dev'));
app.use(cors.cors);
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login',loginRouter);
app.use('/article',articleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;