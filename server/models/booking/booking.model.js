const mongoose = require('./../database');
const { slotSchema } = require('./slot.schema');
const { peerSchema } = require('./peer.schema');

const bookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  slot: {
    slotSchema,
  },
  peer: [peerSchema],
});

const Booking = mongoose.model('Booking', bookingSchema);

const getAllBookings = async () => {
  return await Booking.find({});
};

const getAllBookingSlotsByDate = async (date) => {
  return await Booking.find({ date: new Date(date) }).then(
    (booking) => booking.slot
  );
};

module.exports = { getAllBookings, getAllBookingSlotsByDate };
