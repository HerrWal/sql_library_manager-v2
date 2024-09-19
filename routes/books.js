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

// Full list of books
router.get('/', asyncHandler(async(req, res) => {
    const books = await Book.findAll();
    res.render('index', { books, title: 'Books'});  
}));

// New Book 
router.get('/new', (req, res) => {
  res.render('new-book', { title: "New Book" });
});

// Create Book 
router.post('/books/new', asyncHandler(async(req, res) => {
  console.log(req.body);
    const book = await Book.create(req.body);
    console.log('Submitted: ' + book.title);
    res.redirect('/books/' + book.id);  
}));

// Book Detail
router.get('/:id', asyncHandler(async(req, res) => {
    res.render('update-book', { title: 'Book Details' });  
}));

// Update Book
router.post('/books/:id', asyncHandler(async (req, res) => {
  res.redirect('/books')
}));

module.exports = router;