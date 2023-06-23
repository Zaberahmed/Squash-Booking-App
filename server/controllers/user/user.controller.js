const { hashing, isUserExist, checkCredentials } = require('./helper.controller');

const { createSession, getSession, destroySession } = require('./../../middlewares/sessionManagement');

const { createUser, findUserById, findUserByEmail, confirmBookingByUser } = require('./../../models/user/user.model');

const { getAllBookingSlotsByDate, getUserPreviousDayBookingSlots, bookingConfirmed } = require('./../../models/booking/booking.model');

const registration = async (req, res) => {
	try {
		const { name, membershipId, userRole, email, phone, password } = req.body;

		if (await isUserExist(email)) {
			return res.status(401).send('Email already exists!');
		}

		const hashedPassword = await hashing(password);
		const user = {
			name,
			membershipId,
			userRole,
			email,
			phone,
			password: hashedPassword,
		};

		const newUser = await createUser(user);
		return res.status(200).send(newUser);
	} catch (error) {
		res.status(500);
		console.log(error);
	}
};

const login = async (req, res) => {
	try {
		let { email, password } = req.body;

		if (!(await isUserExist(email))) {
			return res.status(400).send('There is no user with that email!');
		}

		const isCredentialsOk = await checkCredentials(email, password);
		if (!isCredentialsOk) {
			return res.status(401).send('Invalid password!');
		}

		const { _id } = await findUserByEmail(email);

		const token = createSession(_id);
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
			return res.status(400).send('No session to logout.');
		}
		return res.status(200).send('successfully logged out!');
	} catch (error) {
		console.log(error);
	}
};

const profile = async (req, res) => {
	try {
		const token = req.cookies.accessToken;
		const session = getSession(token);

		const profile = await findUserById(session.userId);

		return res.status(200).send(profile);
	} catch (error) {
		res.status(500);
		console.log(error);
	}
};

const availableSlots = async (req, res) => {
	try {
		const { date } = req.body;
		const userDate = new Date(date).setHours(0, 0, 0, 0);

		const bookedSlots = await getAllBookingSlotsByDate(userDate);

		const token = req.cookies.accessToken;
		const session = getSession(token);

		const startDate = new Date(userDate).setDate(new Date(userDate).getDate());
		new Date(startDate).setHours(0, 0, 0, 0);

		const endDate = new Date(userDate).setDate(new Date(userDate).getDate() + 1);
		new Date(endDate).setHours(0, 0, 0, 0);

		const userTodayBooking = await getUserPreviousDayBookingSlots(session.userId, new Date(startDate).toISOString(), new Date(endDate).toISOString());

		let availableSlots = [];
		if (userTodayBooking.length > 0) {
			return res.status(200).send(availableSlots);
		}

		const startDateYesterday = new Date(userDate).setDate(new Date(userDate).getDate() - 1);
		new Date(startDateYesterday).setHours(0, 0, 0, 0);

		const endDateYesterday = new Date(userDate).setDate(new Date(userDate).getDate());
		new Date(endDateYesterday).setHours(0, 0, 0, 0);

		const userYesterdayBooking = await getUserPreviousDayBookingSlots(session.userId, new Date(startDateYesterday).toISOString(), new Date(endDateYesterday).toISOString());

		const startDateTommorrow = new Date(userDate).setDate(new Date(userDate).getDate() + 1);
		new Date(startDateTommorrow).setHours(0, 0, 0, 0);

		const endDateTommorrow = new Date(userDate).setDate(new Date(userDate).getDate() + 2);
		new Date(endDateTommorrow).setHours(0, 0, 0, 0);

		const userTommorrowBooking = await getUserPreviousDayBookingSlots(session.userId, new Date(startDateTommorrow).toISOString(), new Date(endDateTommorrow).toISOString());

		for (let slotName = 'A', time = 6; slotName <= 'P'; slotName = String.fromCharCode(slotName.charCodeAt(0) + 1)) {
			availableSlots.push({
				slotName,
				time: `${time % 12 === 0 ? 12 : time % 12}${time >= 12 ? 'pm' : 'am'}`,
			});
			time++;
		}

		if (userYesterdayBooking.length > 0) {
			availableSlots = availableSlots.filter((slot) => userYesterdayBooking[0].slot.slotName < slot.slotName);
		}

		if (userTommorrowBooking.length > 0) {
			availableSlots = availableSlots.filter((slot) => userTommorrowBooking[0].slot.slotName > slot.slotName);
		}

		if (bookedSlots.length > 0) {
			availableSlots = availableSlots.filter((slot) => !bookedSlots.some((bookedSlot) => bookedSlot.slotName === slot.slotName));
		}

		return res.status(200).send(availableSlots);
	} catch (error) {
		res.status(500);
		console.log(error);
	}
};

const confirmBooking = async (req, res) => {
	try {
		const token = req.cookies.accessToken;
		const session = getSession(token);

		const { date, slot, peer } = req.body;
		const userDate = new Date(date);

		const booking = {
			user: session.userId,
			date: userDate,
			slot: slot,
			peer: {
				opponent: peer.opponent,
			},
		};

		const booked = await bookingConfirmed(booking);
		const { _id } = booked;
		const user = await findUserById(session.userId);

		const userConfirmedBooking = await confirmBookingByUser(user, _id);

		return res.status(200).send(userConfirmedBooking);
	} catch (error) {
		res.status(500);
		console.log(error);
	}
};

const previousBooking = async (req, res) => {
	try {
		const token = req.cookies.accessToken;
		const session = getSession(token);

		const { date } = req.body;
		const userDate = new Date(date);

		const startDate = new Date(userDate).setDate(new Date(userDate).getDate() - 10);
		new Date(startDate).setHours(0, 0, 0, 0);

		const endDate = new Date(userDate).setDate(new Date(userDate).getDate());
		new Date(endDate).setHours(0, 0, 0, 0);

		const userBookings = await getUserPreviousDayBookingSlots(session.userId, startDate, endDate);

		return res.status(200).send(userBookings);
	} catch (error) {
		res.status(500);
		console.log(error);
	}
};

const upcommingBooking = async (req, res) => {
	try {
		const token = req.cookies.accessToken;
		const session = getSession(token);

		const { date } = req.body;
		const userDate = new Date(date);

		const startDate = new Date(userDate).setDate(new Date(userDate).getDate() + 1);
		new Date(startDate).setHours(0, 0, 0, 0);

		const endDate = new Date(userDate).setDate(new Date(userDate).getDate() + 10);
		new Date(endDate).setHours(0, 0, 0, 0);

		const userBookings = await getUserPreviousDayBookingSlots(session.userId, startDate, endDate);

		return res.status(200).send(userBookings);
	} catch (error) {
		res.status(500);
		console.log(error);
	}
};

module.exports = {
	registration,
	login,
	profile,
	logout,
	availableSlots,
	confirmBooking,
	previousBooking,
	upcommingBooking,
};
