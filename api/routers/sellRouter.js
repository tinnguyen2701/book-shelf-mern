/* eslint-disable */
const sellRouter = require('express').Router();
const cloudinary = require('cloudinary');

const Payload = require('../models/payloadModel');
const Book = require('../models/bookModel');
const log = require('../utils/logger');
const upload = require('../config/multer');
const logger = require('../utils/logger');
require('../config/cloudinary');

sellRouter.post(
  '/',
  upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'images[]', maxCount: 8 }]),
  async (req, res) => {
    const { title, description, money, amount } = req.body;

    const poster = await cloudinary.v2.uploader
      .upload(req.files['poster'][0].path)
      .then(result => {
        return result.secure_url;
      })
      .catch(err => {
        logger.logError('faild to upload poster', err);
        res.sendStatus(500);
      });

    const images = await Promise.all(
      req.files['images[]'].map(file => cloudinary.v2.uploader.upload(file.path)),
    )
      .then(responses => {
        return responses.map(response => response.secure_url);
      })
      .catch(err => {
        logger.logError('faild to upload images', err);
        res.sendStatus(500);
      });

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
      .catch(err => {
        log.logError('save payload went wrong!', err);
        return res.status(500).send({ success: false });
      });
  },
);

sellRouter.post(
  '/update',
  upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'images[]', maxCount: 8 }]),
  async (req, res) => {
    const { id, title, description, money, amount } = req.body;

    var poster;
    if (req.files['poster'] === undefined) poster = null;
    else {
      poster = await cloudinary.v2.uploader
        .upload(req.files['poster'][0].path)
        .then(result => {
          return result.secure_url;
        })
        .catch(err => {
          logger.logError('faild to upload poster', err);
          res.sendStatus(500);
        });
    }

    var images;
    if (req.files['images[]'] === undefined) images = null;
    else {
      images = await Promise.all(
        req.files['images[]'].map(file => cloudinary.v2.uploader.upload(file.path)),
      )
        .then(responses => {
          return responses.map(response => response.secure_url);
        })
        .catch(err => {
          logger.logError('faild to upload images', err);
          res.sendStatus(500);
        });
    }

    if (!title || !description || !money || !amount) {
      log.logError('fields was required!');
      return res.status(400).send('fields was required!');
    }

    const matchPayload = await Book.findById(id);
    console.log(matchPayload);

    if (!matchPayload) {
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
        .then(() => {
          logger.logInfo('save success');
          return res.status(200).send({ success: true });
        })
        .catch(err => {
          log.logError('save book went wrong!', err);
          return res.status(500).send({ success: false });
        });
    } else {
      if (!poster) poster = matchPayload.poster;
      if (!images) images = matchPayload.images;

      await Payload.findById(id)
        .then(async payload => {
          if (!payload) {
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
              .then(() => {
                logger.logInfo('save success');
                return res.status(200).send({ success: true });
              })
              .catch(err => {
                log.logError('save book went wrong!', err);
                return res.status(500).send({ success: false });
              });
          } else {
            await Payload.updateOne(
              { _id: id },
              { $set: { title, description, money, amount, poster, images, author: req.user._id } },
            )
              .then(() => {
                log.logInfo('save success');
                return res.status(200).send({ success: true });
              })
              .catch(err => {
                logger.logError('save book went wrong!', err);
                return res.status(500).send({ success: false });
              });
          }
        })
        .catch(err => {
          logger.logError('save book went wrong!', err);
          return res.status(500).send({ success: false });
        });
    }
  },
);

module.exports = sellRouter;
