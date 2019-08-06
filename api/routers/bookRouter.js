/* eslint no-underscore-dangle: "off" */
const bookRouter = require('express').Router();
const passport = require('passport');

const Book = require('../models/bookModel');
const Comment = require('../models/commentModel');

const log = require('../utils/logger');

bookRouter.get('/', async (req, res) => {
  await Book.find({})
    .then(books => {
      return res.status(200).send(books);
    })
    .catch(() => {
      log.logError('find books went wrong!');
      return res.sendStatus(500);
    });
});

bookRouter.get('/:postId', async (req, res) => {
  await Book.findById(req.params.postId)
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'avatar username',
      },
    })
    .then(book => {
      return res.status(200).send(book);
    })
    .catch(() => {
      log.logError('find book went wong!');
      return res.sendStatus(500);
    });
});

bookRouter.post(
  '/favorite/:postId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;

    await Book.findById(postId)
      .then(book => {
        if (!book) return res.sendStatus(404);
        const matchUser = book.favorites.indexOf(userId);
        if (matchUser < 0) {
          book.favorites.push(userId);
          book.save();
          return res.status(200).send({ add: true, userId });
        }
        book.favorites.splice(matchUser, 1);
        book.save();
        return res.status(200).send({ add: false, userId });
      })
      .catch(() => {
        log.logError('find book went wong!');
        return res.sendStatus(500);
      });
  },
);

bookRouter.post(
  '/comments/:postId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { comment } = req.body;

    if (!comment) res.sendStatus(204);

    const newComment = new Comment({
      body: comment,
    });
    newComment.author = req.user._id;

    await newComment.save().then(response =>
      response
        .populate({
          path: 'author',
          select: 'username avatar',
        })
        .execPopulate()
        .then(result => {
          Book.findById(req.params.postId)
            .then(book => {
              if (!book) return res.sendStatus(404);
              book.comments.push(result._id);
              book.save();
              return res.status(200).send(result);
            })
            .catch(() => {
              log.logError('find book went wrong!');
              return res.statusCode(500);
            });
        })
        .catch(() => {
          log.logError('save comment went wrong!');
          return res.statusCode(500);
        }),
    );
  },
);

bookRouter.post(
  '/:postId/comments/delete/:commentId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { postId, commentId } = req.params;
    await Comment.findById(commentId)
      .then(comment => {
        if (!comment) {
          log.logError('not found comment');
          return res.statusCode(403);
        }
        if (!comment.author.equals(req.user._id)) return res.statusCode(404);
        Book.findById(postId).then(book => {
          const matchComment = book.comments.indexOf(commentId);
          book.comments.splice(matchComment, 1);
          book.save();
          comment.remove();
        });
        return res.status(200).send(commentId);
      })
      .catch(() => {
        log.logError('find comment went wrong!');
        return res.statusCode(500);
      });
  },
);

bookRouter.post(
  '/:postId/comments/edit/:commentId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;
    await Comment.findById(commentId)
      .then(comment => {
        if (!comment) {
          log.logError('not found comment');
          return res.statusCode(403);
        }
        if (!comment.author.equals(req.user._id)) return res.statusCode(404);

        comment.body = text;
        comment.save();
        return res.status(200).send({ commentId, text });
      })
      .catch(() => {
        log.logError('find comment went wrong!');
        return res.statusCode(500);
      });
  },
);
module.exports = bookRouter;
