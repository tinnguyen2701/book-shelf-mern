/* eslint-disable */
const authRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const uuid = require('uuid/v4');
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');
const cloudinary = require('cloudinary');

const User = require('../models/userModel');
const Book = require('../models/bookModel');
const Comment = require('../models/commentModel');

const upload = require('../config/multer');
require('../config/cloudinary');

authRouter.post('/register', upload.fields([{ name: 'avatar', maxCount: 1 }]), async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(403).json({ message: 'you can not register' });
  }
  const user = await User.findOne({ email });

  if (user) return res.status(403).json({ message: 'this user was used' });

  const avatar = await cloudinary.v2.uploader
    .upload(req.files['avatar'][0].path)
    .then(result => {
      return result.secure_url;
    })
    .catch(err => {
      logger.logError('faild to upload avatar', err);
      res.sendStatus(500);
    });

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      const newUser = new User({
        email,
        username,
        avatar,
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
          return Promise.all(
            user.sell.map(item => {
              const book = Book.findById(item);
              return book;
            }),
          )
            .then(responses => {
              user.sell = responses;
              return res.status(200).json({
                success: true,
                token: token,
                currentUser: user,
              });
            })
            .catch(() => {
              logger.logError('find book went wrong');
              return res.sendStatus(500);
            })

            .catch(() => {
              logger.logError('find user went wrong');
              return res.sendStatus(500);
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
        if (user && user.verify === code) {
          jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' }, function(err, token) {
            return res.status(200).send({
              success: true,
              token: token,
            });
          });
        } else {
          return res.status(403).json({ success: false, message: 'code was wrong' });
        }
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).json({ success: false, message: 'find user error' });
      });
  }
});

authRouter.post('/updatePassword', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(403).send({ success: false, message: 'this field is required' });
  User.findOne({ email: req.user.email }).then(user => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, async function(err, hash) {
        user.password = hash;
        await user.save().then(() => res.json({ success: true }));
      });
    });
    return res.status(200).send({ success: true });
  });
});

authRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  return Promise.resolve(User.findById(req.user._id))
    .then(user =>
      Promise.all(
        user.sell.map(item => {
          const book = Book.findById(item);
          return book;
        }),
      )
        .then(responses => {
          req.user.sell = responses;
          return res.status(200).json(req.user);
        })
        .catch(() => {
          logger.logError('find book went wrong');
          return res.sendStatus(500);
        }),
    )
    .catch(() => {
      logger.logError('find user went wrong');
      return res.sendStatus(500);
    });
});

authRouter.post(
  '/editUser',
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    return new Promise((resolve, reject) => {
      resolve(User.findById(req.user._id));
    })
      .then(async user => {
        if (!user) {
          logger.logError('user not found');
          return res.sendStatus(404);
        } else {
          const avatar = await cloudinary.v2.uploader
            .upload(req.files['avatar'][0].path)
            .then(result => {
              return result.secure_url;
            })
            .catch(err => {
              logger.logError('faild to upload avatar', err);
              res.sendStatus(500);
            });

          if (oldPassword !== 'null') {
            bcrypt.compare(oldPassword, user.password).then(isMatch => {
              if (!isMatch) {
                return res.status(200).send({ status: 403, message: 'old password was wrong' });
              }

              bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newPassword, salt, function(err, hash) {
                  user.password = hash;
                  user.save();
                  return res.status(200).send({ success: true, username, avatar });
                });
              });
            });
          } else {
            user.username = username;
            user.avatar = avatar;
            user.save();
            return res.status(200).send({ success: true, username, avatar });
          }
        }
      })
      .catch(() => {
        logger.logError('find user went wrong');
        return res.sendStatus(500);
      });
  },
);

authRouter.post(
  '/deleteBuy',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await User.findById(req.user._id)
      .then(user => {
        if (!user) {
          logger.logError('user not found');
          return res.sendStatus(403);
        } else {
          const matchItem = user.buy.findIndex(item => item._id.equals(req.body.id));
          user.buy.splice(matchItem, 1);
          user.save();
          return res.status(200).send(user.buy);
        }
      })
      .catch(() => {
        logger.logError('find user went wrong');
        return res.sendStatus(500);
      });
  },
);

authRouter.post(
  '/deleteSell',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await User.findById(req.user._id)
      .then(user => {
        if (!user) {
          logger.logError('user not found');
          return res.sendStatus(403);
        } else {
          const matchItem = user.sell.findIndex(item => item.equals(req.body.id));

          Book.findById(req.body.id)
            .populate('author')
            .then(book => {
              if (!book) {
                logger.logError('find book not found');
                return res.sendStatus(404);
              } else if (book.author._id.equals(req.user._id)) {
                user.sell.splice(matchItem, 1);

                book.remove();

                user.save();
                return Promise.all(
                  user.sell.map(item => {
                    const book = Book.findById(item);
                    return book;
                  }),
                )
                  .then(responses => {
                    return res.status(200).send(responses);
                  })
                  .catch(() => {
                    logger.logError('find book went wrong');
                    return res.sendStatus(500);
                  });
              } else {
                logger.logError('you dont have permission');
                return res.sendStatus(401);
              }
            })
            .catch(() => {
              logger.logError('find book went wrong');
              return res.sendStatus(500);
            });
        }
      })
      .catch(() => {
        logger.logError('find user went wrong');
        return res.sendStatus(500);
      });
  },
);

authRouter.post('/editSell', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await User.findById(req.user._id)
    .then(user => {
      if (!user) {
        logger.logError('user not found');
        return res.sendStatus(403);
      } else {
        Book.findById(req.body.id)
          .then(book => {
            if (!book || !book.author.equals(req.user._id)) {
              logger.logError('find book not found');
              return res.sendStatus(404);
            }
            return res.status(200).send(book);
          })
          .catch(() => {
            logger.logError('find book went wrong');
            return res.sendStatus(500);
          });
      }
    })
    .catch(() => {
      logger.logError('find user went wrong');
      return res.sendStatus(500);
    });
});

authRouter.post('/remove', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Book.find({ author: req.user._id }).then(books => {
    books.map(book => {
      book.remove();
    });
  });

  await Comment.find({ author: req.user._id }).then(comments => {
    comments.map(comment => {
      comment.remove();
    });
  });

  await User.findById(req.user._id).remove();

  return res.status(200).send({ success: true });
});

module.exports = authRouter;
