/* eslint no-underscore-dangle: "off" */
const orderRouter = require('express').Router();
const User = require('../models/userModel');
const logger = require('../utils/logger');

orderRouter.post('/', async (req, res) => {
  const { cart, amount } = req.body;

  const newItem = {
    ...cart,
    amount,
  };

  await User.findById(req.user._id)
    .then(user => {
      user.order.push(newItem);
      user.save();
      return res.status(200).send(user.order);
    })
    .catch(() => {
      logger.logError('find user went wrong');
      return res.sendStatus(404);
    });
});

orderRouter.post('/delete', async (req, res) => {
  const { cartId } = req.body;

  await User.findById(req.user._id)
    .then(user => {
      const matchCart = user.order.findIndex(item => item.equals(cartId));
      user.order.splice(matchCart, 1);
      user.save();
      return res.status(200).send(user.order);
    })
    .catch(() => {
      logger.logError('find user went wrong');
      return res.sendStatus(404);
    });
});

module.exports = orderRouter;
