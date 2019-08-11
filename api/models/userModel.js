const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verify: {
    type: String,
  },
  avatar: {
    type: String,
  },
  carts: [
    {
      bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
      money: Number,
      amount: Number,
      title: String,
      poster: String,
    },
  ],
  order: [
    {
      _id: Schema.Types.ObjectId,
      bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
      money: Number,
      amount: Number,
      title: String,
      poster: String,
    },
  ],
  buy: [
    {
      _id: Schema.Types.ObjectId,
      bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
      money: Number,
      amount: Number,
      title: String,
      poster: String,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
