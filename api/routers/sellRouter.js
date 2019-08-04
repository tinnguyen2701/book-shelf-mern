/* eslint no-underscore-dangle: "off" */
const sellRouter = require('express').Router();

const Book = require('../models/bookModel');
const log = require('../utils/logger');

sellRouter.post('/', async (req, res) => {
  const { title, description, money, amount, poster, images } = req.body;

  if (!title || !description || !money || !amount || !poster || !images) {
    log.logError('fields was required!');
    return res.status(400).send('fields was required!');
  }
  const book = new Book({
    title,
    description,
    money,
    amount,
    poster,
    images,
  });
  book.author = req.user._id;

  await book
    .save()
    .then(() => {
      log.logInfo('save success');
      return res.status(200).send({ success: true });
    })
    .catch(() => {
      log.logError('save book went wrong!');
      return res.status(500).send('ok');
    });
});

module.exports = sellRouter;
