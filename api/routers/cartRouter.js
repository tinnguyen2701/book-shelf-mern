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

bookRouter.post('/delete', async (req, res) => {
  const { cartId } = req.body;

  await User.findById(req.user._id)
    .then(user => {
      const matchCart = user.carts.findIndex(cart => cart._id.equals(cartId));
      user.carts.splice(matchCart, 1);
      user.save();
      return res.status(200).send(user.carts);
    })
    .catch(() => {
      logger.logError('find user went wrong!');
      return res.sendStatus(404);
    });
});

module.exports = bookRouter;
