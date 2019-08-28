const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  money: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  bought: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

module.exports = mongoose.model('Book', bookSchema);
