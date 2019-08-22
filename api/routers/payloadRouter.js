/* eslint no-underscore-dangle: "off" */
const payloadRouter = require('express').Router();
const Payload = require('../models/payloadModel');
const Book = require('../models/bookModel');
const User = require('../models/userModel');

const logger = require('../utils/logger');

payloadRouter.get('/', async (req, res) => {
  if (req.user.email !== process.env.REACT_APP_MAIL_ADMIN) {
    return res.sendStatus(401);
  }

  const payloads = await Payload.find({});
  return res.status(200).send({ payloads });
});

payloadRouter.post('/approve', async (req, res) => {
  if (req.user.email !== process.env.REACT_APP_MAIL_ADMIN) {
    return res.sendStatus(401);
  }

  const { title, description, money, amount, poster, images, author } = req.body;

  const book = new Book({
    title,
    description,
    money,
    amount,
    poster,
    images,
    author,
  });

  await book
    .save()
    .then(async () => {
      const payload = await Payload.findById(req.body._id);
      await payload.remove();

      const user = await User.findById(author);
      user.sell.push(book._id);
      user.save();

      return res.status(200).send({ success: true });
    })
    .catch(err => {
      logger.logError('save book went wrong', err);
      return res.sendStatus(500);
    });
});

module.exports = payloadRouter;
