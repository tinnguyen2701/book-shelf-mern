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

  await Book.findById(req.body._id)
    .then(async book => {
      if (!book) {
        const item = new Book({
          title,
          description,
          money,
          amount,
          poster,
          images,
          author,
        });

        await item
          .save()
          .then(async () => {
            const payload = await Payload.findById(req.body._id);
            await payload.remove();

            const user = await User.findById(author);
            user.sell.push(item._id);
            user.save();

            const payloads = await Payload.find({});

            return res.status(200).send({ success: true, payloads });
          })
          .catch(err => {
            logger.logError('save book went wrong', err);
            return res.sendStatus(500);
          });
      } else {
        book.title = title;
        book.description = description;
        book.money = money;
        book.amount = amount;
        book.poster = poster;
        book.images = images;
        await book
          .save()
          .then(async () => {
            const payload = await Payload.findById(req.body._id);
            await payload.remove();

            const payloads = await Payload.find({});

            return res.status(200).send({ success: true, payloads });
          })
          .catch(err => {
            logger.logError('update book went wrong', err);
            return res.sendStatus(500);
          });
      }
    })
    .catch(err => {
      logger.logError('find book went wrong', err);
      return res.sendStatus(500);
    });
});

payloadRouter.post('/reject', async (req, res) => {
  if (req.user.email !== process.env.REACT_APP_MAIL_ADMIN) {
    return res.sendStatus(401);
  }

  const payload = await Payload.findById(req.body.id);
  await payload.remove();
  const payloads = await Payload.find({});

  return res.status(200).send({ success: true, payloads });
});

module.exports = payloadRouter;
