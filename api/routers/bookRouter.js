/* eslint no-underscore-dangle: "off" */
const bookRouter = require('express').Router();
const passport = require('passport');

const Book = require('../models/bookModel');
const User = require('../models/userModel');
const log = require('../utils/logger');

bookRouter.get('/', async (req, res) => {
  await Book.find({})
    .then(books => {
      return res.status(200).send(books);
    })
    .catch(() => {
      log.logError('find books went wrong!');
      return res.sendStatus(500);
    });
});

bookRouter.get('/:postId', async (req, res) => {
  await Book.findById(req.params.postId)
    .then(book => {
      return res.status(200).send(book);
    })
    .catch(() => {
      log.logError('find book went wong!');
      return res.sendStatus(500);
    });
});

bookRouter.post(
  '/favorite/:postId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const userId = req.user._id;
    const postId = req.params.postId;
    await Book.findById(postId)
      .then(book => {
        User.findById(userId)
          .then(user => {
            const match = user.favorites.indexOf(postId);
            if (match < 0) {
              user.favorites.push(postId);
              user.save();
              book.favorites.push(userId);
              book.save();
              return res.status(200).send({ add: true });
            } else {
              user.favorites.splice(match, 1);
              user.save();
              const matchUser = book.favorites.indexOf(userId);
              book.favorites.splice(matchUser, 1);
              book.save();
              return res.status(200).send({ add: false });
            }
          })
          .catch(() => {
            log.logError('find user went wong!');
            return res.sendStatus(500);
          });
      })
      .catch(() => {
        log.logError('find book went wong!');
        return res.sendStatus(500);
      });
  },
);

module.exports = bookRouter;
