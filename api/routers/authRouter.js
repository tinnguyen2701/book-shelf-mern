/* eslint-disable */
const authRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/userModel');

authRouter.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(403).json({ message: 'you can not register' });
  }
  const user = await User.findOne({ email });

  if (user) return res.status(403).json({ message: 'this user was used' });

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      const newUser = new User({
        email,
        username,
        password: hash,
      });

      newUser
        .save()
        .then(newUser => res.json({ success: true }))
        .catch(() => console.log('can not save user'));
    });
  });
});

authRouter.post('/login', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({ message: 'you can not login' });
  }

  await User.findOne({ email }).then(user => {
    if (!user) return res.status(403).send({ messages: 'User not found' });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '20s' }, function(err, token) {
          return res.status(200).json({
            success: true,
            token: token,
            currentUser: user,
          });
        });
      } else {
        return res.status(403).send({ success: false, message: 'password was wrong' });
      }
    });
  });
});

authRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.status(200).json(req.user);
});

module.exports = authRouter;
