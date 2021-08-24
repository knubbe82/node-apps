import { default as createError } from 'http-errors';
import { InMemoryNotesStore } from './models/notes-memory.mjs';
export const NotesStore = new InMemoryNotesStore();
import { default as express } from 'express';
import { default as hbs } from 'hbs';
import * as path from 'path';
import { default as cookieParser } from 'cookie-parser';
import { default as logger } from 'morgan';
import * as http from 'http';
import { approotdir } from './approotdir.mjs';
const dirname = approotdir;

import { normalizePort, onError, onListening } from './appsuport.mjs';

import { router as indexRouter } from './routes/index.mjs';
import { router as notesRouter } from './routes/notes.mjs';

export const app = express();

// view engine setup
app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(dirname, 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, 'public')));
app.use('/assets/vendor/bootstrap', express.static(path.join(dirname, 'theme', 'dist')));
app.use('/assets/vendor/jquery', express.static(path.join(dirname, 'node_modules', 'jquery', 'dist')));
app.use('/assets/vendor/popper.js', express.static(path.join(dirname, 'node_modules', 'popper.js', 'dist', 'umd')));
app.use('/assets/vendor/feather-icons', express.static(path.join(dirname, 'node_modules', 'feather-icons', 'dist')));

app.use('/', indexRouter);
app.use('/notes', notesRouter);

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
