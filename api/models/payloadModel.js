const mongoose = require('mongoose');

const { Schema } = mongoose;

const payloadSchema = new Schema({
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
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Payload', payloadSchema);
