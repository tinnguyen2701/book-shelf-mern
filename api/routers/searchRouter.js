/* eslint no-underscore-dangle: "off" */
const searchRouter = require('express').Router();
const User = require('../models/userModel');
const Book = require('../models/bookModel');

searchRouter.get('/', async (req, res) => {
  const { name } = req.query;
  const users = await User.find({ username: name }, { username: 1, avatar: 1 });
  const books = await Book.find({ title: { $regex: name } }, { title: 1, poster: 1, money: 1 });
  return res.status(200).send({ users, books });
});

module.exports = searchRouter;
