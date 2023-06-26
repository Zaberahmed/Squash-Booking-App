const { slotSchema } = require('./../booking/slot.schema');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  dates: [
    {
      type: String,
      required: true,
    },
  ],
  days: [
    {
      type: String,
      required: true,
    },
  ],
  slots: [slotSchema],
});

const Event = mongoose.model('Event', eventSchema);

const createEvent = async (event) => {
  try {
    return await Event.create({
      title: event.title,
      type: event.type,
      dates: event.dates,
      days: event.days,
      slots: event.slots,
    });
  } catch (error) {
    console.log(error);
  }
};

const findAllEvents = async (event) => {
  try {
    return await Event.find({});
  } catch (error) {
    console.log(error);
  }
};

const deleteEventById = async (eventId) => {
  try {
    return await Event.deleteOne({ _id: eventId });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createEvent, findAllEvents, deleteEventById };
