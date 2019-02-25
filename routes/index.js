const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('pages/index', {
    pageName: 'index',
    currentLocale: res.locale
  });
});

// router.use('/nosotros', require('./about-us'));

// catch 404 and forward to error handler
router.use((req, res, next) => next(createError(404)));

module.exports = router;
