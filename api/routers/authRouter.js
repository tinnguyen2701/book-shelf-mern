/* eslint-disable */
const authRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const uuid = require('uuid/v4');
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

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
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({ message: 'you can not login' });
  }

  await User.findOne({ email }).then(user => {
    if (!user) return res.status(403).send({ messages: 'User not found' });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' }, function(err, token) {
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

authRouter.post('/verify', async (req, res) => {
  const { email, code } = req.body;
  if (!code) {
    await User.findOne({ email }).then(user => {
      if (!user) return res.status(403).send({ messages: 'User not found' });
      else {
        // send mail
        const verifiedCode = uuid(); // random code
        user.verify = verifiedCode;
        user
          .save()
          .then(() => {
            logger.logInfo('save success code verification');
          })
          .catch(() => {
            logger.logError('save error code verification');
            return res.status(500).json({ success: false, message: 'save code error' });
          });

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.usernameMailer,
            pass: process.env.passwordMailer,
          },
        });
        const mainOptions = {
          from: process.env.usernameMailer,
          to: email,
          subject: 'verified code',
          text: 'You recieved code from [MY BOOK SHELF]',
          html: `<p>You have got a new code: ${verifiedCode}</p>`,
        };

        transporter.sendMail(mainOptions, (err, info) => {
          if (err) {
            logger.logError(err);
            return res.status(500).json({ success: false });
          } else {
            logger.logInfo(`send code verify success ${info.response}`);
          }
        });
        return res.status(200).json({ success: true });
      }
    });
  } else {
    User.findOne({ email })
      .then(user => {
        if (user && user.verify === code) return res.status(200).json({ success: true });
        return res.status(403).json({ success: false, message: 'code was wrong' });
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).json({ success: false, message: 'find user error' });
      });
  }
});

authRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.status(200).json(req.user);
});

module.exports = authRouter;
