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

const getAllUser = async () => {
	return await User.find({});
};

const findUserByEmail = async (email) => {
	return await User.findOne({ email: email });
};

const createUser = async (user) => {
	return await User.create({
		name: user.name,
		membershipId: user.membershipId,
		userRole: user.userRole,
		email: user.email,
		phone: user.phone,
		password: user.password,
	});
};

module.exports = { getAllUser, findUserByEmail, createUser };
