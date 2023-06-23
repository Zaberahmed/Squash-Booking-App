const mongoose = require('./../database');
const { slotSchema } = require('./slot.schema');
const { peerSchema } = require('./peer.schema');

const bookingSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	slot: slotSchema,

	peer: [peerSchema],
});

const Booking = mongoose.model('Booking', bookingSchema);

const getAllBookings = async () => {
	try {
		return await Booking.find({});
	} catch (error) {
		console.log(error);
	}
};

const getAllBookingSlotsByDate = async (userDate) => {
	try {
		const startDate = new Date(userDate);
		const endDate = new Date(userDate).setDate(startDate.getDate() + 1);

		const bookings = await Booking.find({
			date: { $gte: startDate, $lte: endDate },
		});

		const slots = bookings.map((booking) => booking.slot);
		return slots;
	} catch (error) {
		console.log(error);
	}
};

const getUserPreviousDayBookingSlots = async (id, startDate, endDate) => {
	try {
		return await Booking.find({
			date: { $gte: startDate, $lte: endDate },
			user: id,
		});
	} catch (error) {
		console.log(error);
	}
};

const bookingConfirmed = async (booking) => {
	try {
		return await Booking.create({
			user: booking.user,
			date: booking.date,
			slot: { slotName: booking.slot.slotName, time: booking.slot.time },
			peer: [
				{
					isGuest: false,
					opponent: booking.peer.opponent,
					guestName: '',
					guestEmail: '',
				},
			],
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllBookings,
	getAllBookingSlotsByDate,
	bookingConfirmed,
	getUserPreviousDayBookingSlots,
};
