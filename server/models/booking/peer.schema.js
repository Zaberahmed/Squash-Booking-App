const mongoose = require('./../database');

const peerSchema = new mongoose.Schema({
  isGuest: {
    type: Boolean,
    required: true,
  },
  opponent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  guestName: {
    type: String,
  },
  guestEmail: {
    type: String,
  },
});

module.exports = { peerSchema };
