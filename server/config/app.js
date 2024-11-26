const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('../../index');
const usersRouter = require('../routes/users');
const assignmentRouter = require('../routes/assignment');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// point mongoose to the DB URI
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{
  console.log('MongoDB Connected');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter); //localhost:4000
app.use('/users', usersRouter); //localhost:4000/users
app.use('/assignmentslist',assignmentRouter);

app.use(function(req,res,next) {
  next(createError(404));
});

app.use(function(err,req,res,next){
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', {title: 'Error'});
});

module.exports = app;
