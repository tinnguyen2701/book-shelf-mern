const bookRouter = require('express').Router();

const Book = require('../models/bookModel');
const log = require('../utils/logger');

bookRouter.get('/', async (req, res) => {
  await Book.find({})
    .then(books => {
      return res.status(200).send(books);
    })
    .catch(() => {
      log.logError('find books went wrong!');
      return res.status(500);
    });
});

bookRouter.get('/:postId', async (req, res) => {
  return res.send({ title: '1' });
});

module.exports = bookRouter;
