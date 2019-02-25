const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const i18n = require('i18n');
const app = express();

const routes = require('./routes');

let sassMiddlewareOptions = {
  src: path.join(__dirname, 'assets/styles'),
  dest: path.join(__dirname, 'public/css'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  prefix: '/css'
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// i18n setup
i18n.configure({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
  queryParameter: 'lang'
});
app.use(i18n.init);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  // styles css preprocessor setup
  return app.use(sassMiddleware(Object.assign(sassMiddlewareOptions, {
    outputStyle: 'compressed',
    debug: false
  })));
}

// styles css preprocessor setup
app.use(sassMiddleware(Object.assign(sassMiddlewareOptions, {
  debug: true
})));
app.use(express.static(path.join(__dirname, 'public')));

// mount the routes
app.use(routes);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
