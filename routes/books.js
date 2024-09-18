var express = require('express');
const { render } = require('../app');
var router = express.Router();
const { Book } = require('../models');

// Handler function to wrap each route
function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

/* GET all books. */
router.get('/', asyncHandler(async(req, res, next) => {
    const books = await Book.findAll();
    console.log("Books:", books);
    res.render('index', { books, title: 'Books'});
  }
));

module.exports = router;
