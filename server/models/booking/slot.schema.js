const mongoose = require('./../database');

const slotSchema = new mongoose.Schema({
  slotName: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = { slotSchema };
