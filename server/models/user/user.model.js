const mongoose = require('./../database');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	membershipId: {
		type: String,
		required: true,
	},
	userRole: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	bookings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Booking',
		},
	],
});

const User = mongoose.model('User', userSchema);

const findAllUser = async () => {
	try {
		return await User.find({});
	} catch (error) {
		console.log(error);
	}
};

const findUserByEmail = async (email) => {
	try {
		return await User.findOne({ email: email });
	} catch (error) {
		console.log(error);
	}
};

const findUserById = async (id) => {
	try {
		return await User.findOne({ _id: id });
	} catch (error) {
		console.log(error);
	}
};

const createUser = async (user) => {
	try {
		return await User.create({
			name: user.name,
			membershipId: user.membershipId,
			userRole: user.userRole,
			email: user.email,
			phone: user.phone,
			password: user.password,
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async (userId) => {
	try {
		return await User.deleteOne({
			_id: userId,
		});
	} catch (error) {
		console.log(error);
	}
};

const confirmBookingByUser = async (user, bookingId) => {
	try {
		user.bookings.push(bookingId);
		return await user.save();
	} catch (error) {
		console.log(error);
	}
};

const deleteUserBooking = async (user, bookingId) => {
	try {
		const index = await user.bookings.indexOf(bookingId);

		if (index !== -1) {
			user.bookings.splice(index, 1);
		}

		return await user.save();
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	findAllUser,
	findUserById,
	findUserByEmail,
	createUser,
	deleteUser,
	confirmBookingByUser,
	deleteUserBooking,
};
