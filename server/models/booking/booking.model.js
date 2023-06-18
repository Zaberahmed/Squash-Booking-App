const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  slot: {
    slotName: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  peer: {
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
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { getAll };

// need more function getAll, getById, getByUserId,

async function getAll() {
  return await Booking.find({});
}
