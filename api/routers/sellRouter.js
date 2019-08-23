// /* eslint-disable */
const sellRouter = require('express').Router();

const Payload = require('../models/payloadModel');
const User = require('../models/userModel');
const log = require('../utils/logger');

sellRouter.post('/', async (req, res) => {
  const { title, description, money, amount, poster, images } = req.body;

  if (!title || !description || !money || !amount || !poster || !images) {
    log.logError('fields was required!');
    return res.status(400).send('fields was required!');
  }
  const payload = new Payload({
    title,
    description,
    money,
    amount,
    poster,
    images,
  });
  payload.author = req.user._id;

  await payload
    .save()
    .then(() => {
      log.logInfo('save success');
      return res.status(200).send({ success: true });
    })
    .catch(() => {
      log.logError('save payload went wrong!');
      return res.status(500).send({ success: false });
    });
});

sellRouter.post('/update', async (req, res) => {
  const { id, title, description, money, amount, poster, images } = req.body;

  if (!title || !description || !money || !amount || !poster || !images) {
    log.logError('fields was required!');
    return res.status(400).send('fields was required!');
  }
  const payload = new Payload({
    title,
    description,
    money,
    amount,
    poster,
    images,
  });
  payload._id = id;
  payload.author = req.user._id;

  await payload
    .save()
    .then(result => {
      log.logInfo('save success');
      return res.status(200).send({ success: true });
    })
    .catch(() => {
      log.logError('save book went wrong!');
      return res.status(500).send({ success: false });
    });
});

module.exports = sellRouter;
