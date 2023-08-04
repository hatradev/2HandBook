const mongoose = require('mongoose');

const announceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    recipient: {
      type: String,
      enum: ['Everyone', 'Buyers', 'Sellers'],
      default: 'Everyone',
    },
    content: { type: String, required: true },
    time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('announcement', announceSchema);
