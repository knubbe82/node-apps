// var createError = require('http-errors');
import { default as createError } from 'http-errors';
// var express = require('express');
import { default as express } from 'express';
// var path = require('path');
import * as path from 'path';
// var cookieParser = require('cookie-parser');
import { default as cookieParser } from 'cookie-parser';
// var logger = require('morgan');
import { default as logger } from 'morgan';
import * as http from 'http';
import { approotdir } from './approotdir.mjs';
const dirname = approotdir;

import { normalizePort, onError, onListening } from './appsuport.mjs';

// var indexRouter = require('./routes/index');
import { router as indexRouter } from './routes/index.mjs';

export const app = express();

// view engine setup
app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, 'public')));

app.use('/', indexRouter);

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

export const port = normalizePort(process.env.PORT || '3000')
app.set('port', port);

export const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
