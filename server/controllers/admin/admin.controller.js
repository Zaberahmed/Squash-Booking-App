const { isUserNameValid, checkCredentials } = require('./helper.controller');
const { findAllUser, findUserById, deleteUserBooking, deleteUser } = require('../../models/user/user.model');
const { findAllBookings, findBookingById, deleteBooking } = require('../../models/booking/booking.model');
const { createEvent, findAllEvents, deleteEventById } = require('../../models/admin/event.model');

const login = async (req, res) => {
	try {
		const { userName, password } = req.body;

		if (!(await isUserNameValid(userName))) {
			return res.status(400).send({ message: 'Admin is not valid' });
		}

		const isCredentialsOk = await checkCredentials(userName, password);
		if (!isCredentialsOk) {
			return res.status(401).send({ message: 'Invalid password!' });
		}

		const token = createSession(userName);
		res.cookie('accessToken', token, {
			httpOnly: false,
			secure: false,
			sameSite: 'Strict',
		});

		return res.status(200).send({ accessToken: token });
	} catch (error) {
		res.status(500);
		console.log(error);
	}
};

const logout = (req, res) => {
	try {
		const token = req.cookies.accessToken;
		if (!destroySession(token)) {
			return res.status(400).send({ message: 'No session to logout.' });
		}
		return res.status(200).send({ message: 'successfully logged out!' });
	} catch (error) {
		console.log(error);
	}
};

const getAllUser = async (req, res) => {
	try {
		const users = await findAllUser();
		return res.status(200).send(users);
	} catch (error) {
		console.log(error);
	}
};

const getUser = async (req, res) => {
	try {
		const { _id } = req.body;
		const user = await findUserById(_id);
		return res.status(200).send(user);
	} catch (error) {
		console.log(error);
	}
};

const getAllBookings = async (req, res) => {
	try {
		const bookings = await findAllBookings();
		return res.status(200).send(bookings);
	} catch (error) {
		console.log(error);
	}
};

const getBooking = async (req, res) => {
	try {
		const { _id } = req.body;
		const booking = await findBookingById(_id);
		return res.status(200).send(booking);
	} catch (error) {
		console.log(error);
	}
};

const deleteUserByAdmin = async (req, res) => {
	try {
		const { _id } = req.body;
		const user = await findUserById(_id);
		await deleteUser(_id);

		const { bookings } = user;
		bookings.forEach(async (bookingId) => {
			await deleteBooking(bookingId);
		});

		return res.status(200).send({ message: 'User deleted successfully.' });
	} catch (error) {
		console.log(error);
	}
};

const deleteBookingByAdmin = async (req, res) => {
	try {
		const { _id } = req.body;
		const booking = await findBookingById(_id);
		if (!booking) {
			return res.status(404).send({ message: 'Booking not found.' });
		}

		const { user } = booking;
		await deleteBooking(_id);
		const bookingUser = await findUserById(user);
		await deleteUserBooking(bookingUser, _id);

		return res.status(200).send({ message: 'Booking successfully deleted.' });
	} catch (error) {
		console.log(error);
	}
};

const addEvent = async (req, res) => {
	try {
		const { title, type, dates, days, slots } = req.body;
		const event = {
			title,
			type,
			dates,
			days,
			slots,
		};

		const newEvent = await createEvent(event);
		return res.status(200).send(newEvent);
	} catch (error) {
		console.log(error);
	}
};

const removeEvent = async (req, res) => {
	try {
		const { _id } = req.body;

		await deleteEventById(_id);
		return res.status(200).send({ message: 'Event deleted successfully.' });
	} catch (error) {
		console.log(error);
	}
};

const getAllEvents = async (req, res) => {
	try {
		const events = await findAllEvents();
		return res.status(200).send(events);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	login,
	logout,
	getAllUser,
	getUser,
	getAllBookings,
	getBooking,
	deleteUserByAdmin,
	deleteBookingByAdmin,
	addEvent,
	removeEvent,
	getAllEvents,
};
