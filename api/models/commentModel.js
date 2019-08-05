const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Comment', commentSchema);
