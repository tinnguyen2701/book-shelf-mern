/* eslint no-underscore-dangle: "off" */
const bookRouter = require('express').Router();
const User = require('../models/userModel');
const logger = require('../utils/logger');

bookRouter.post('/', async (req, res) => {
  const cartsPayload = req.body.carts;
  const userId = req.user._id;

  await User.updateMany(
    { _id: userId },
    { $push: { carts: { $each: cartsPayload } } },
    { upsert: true },
  )
    .then(() => {
      User.findById(userId).then(user => {
        return res.status(200).send(user.carts);
      });
    })
    .catch(() => {
      logger.logError('update cart went wrong!');
      return res.sendStatus(500);
    });
});

module.exports = bookRouter;
