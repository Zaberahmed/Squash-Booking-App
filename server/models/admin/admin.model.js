const mongoose = require('./../database');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

const findAdminByUserName = async (userName) => {
  try {
    return await Admin.findOne({ userName: userName });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { findAdminByUserName };
