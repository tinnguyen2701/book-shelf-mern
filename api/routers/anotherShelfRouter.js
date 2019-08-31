/* eslint no-underscore-dangle: "off" */
const anotherShelfRouter = require('express').Router();
const User = require('../models/userModel');
const Book = require('../models/bookModel');
const logger = require('../utils/logger');

anotherShelfRouter.get('/:userId', async (req, res) => {
  await User.findById(req.params.userId)
    .then(user => {
      if (!user) return res.sendStatus(404);

      return Promise.all(
        user.sell.map(item => {
          const book = Book.findById(item);
          return book;
        }),
      )
        .then(responses => {
          const result = responses.map(response => ({
            poster: response.poster,
            title: response.title,
            amount: response.amount,
            money: response.money,
            id: response._id,
          }));
          return res.status(200).send({ sell: result, username: user.username });
        })
        .catch(() => {
          return res.sendStatus(500);
        });
    })
    .catch(() => {
      logger.logError('find user went wrong!');
      return res.sendStatus(500);
    });
});

module.exports = anotherShelfRouter;
