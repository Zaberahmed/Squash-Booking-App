const { getAllUser } = require('./../../models/user/user.model');

const getAllMember = async (req, res) => {
	try {
		const users = await getAllUser();
		return res.status(200).send(users);
	} catch (error) {
		res.status(500);
		console.log(error);
	}
};

module.exports = { getAllMember };
