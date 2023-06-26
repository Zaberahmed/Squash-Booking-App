const { findAdminByUserName } = require('./../../models/admin/admin.model');

const isUserNameValid = async (userName) => {
  const admin = await findAdminByUserName(userName);

  if (!admin) return false;
  return true;
};

const checkCredentials = async (email, password) => {
  try {
    return await findUserByEmail(email).then((admin) => {
      if (admin) return admin.password === password;
      return false;
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isUserNameValid, checkCredentials };
