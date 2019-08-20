/* eslint no-underscore-dangle: "off" */
const sellRouter = require('express').Router();

const Book = require('../models/bookModel');
const User = require('../models/userModel');
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
    .then(result => {
      User.findById(req.user._id)
        .then(user => {
          if (!user) {
            log.logError('user not found');
            return res.status(500).send({ success: false });
          }
          user.sell.push(result._id);
          user.save();
        })
        .catch(() => {
          log.logError('find user went wrong!');
          return res.status(500).send({ success: false });
        });
      log.logInfo('save success');
      return res.status(200).send({ success: true });
    })
    .catch(() => {
      log.logError('save book went wrong!');
      return res.status(500).send({ success: false });
    });
});

sellRouter.post('/update', async (req, res) => {
  const { id, title, description, money, amount, poster, images } = req.body;

  await Book.findById(id)
    .then(book => {
      if (!book || !book.author.equals(req.user._id)) {
        log.logError('save book went wrong!');
        return res.sendStatus(404);
      }
      book.title = title;
      book.description = description;
      book.money = money;
      book.amount = amount;
      book.poster = poster;
      book.images = images;

      book
        .save()
        .then(() => {
          log.logError('update book success!');
          return res.status(200).send({ success: true });
        })
        .catch(() => {
          log.logError('update book went wrong!');
          return res.sendStatus(500);
        });
    })
    .catch(() => {
      log.logError('find book went wrong!');
      return res.sendStatus(500);
    });
});

module.exports = sellRouter;
