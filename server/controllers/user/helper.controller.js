const bcrypt = require('bcrypt');
const { findUserByEmail } = require('./../../models/user/user.model');

const hashing = async (password) => {
  return await bcrypt.hash(password, (saltRounds = 10)).then((hash) => hash);
};

const isUserExist = async (email) => {
  const user = await findUserByEmail(email);

  if (!user) return false;
  return true;
};

const checkCredentials = async (email, password) => {
  try {
    if (!(await isUserExist(email))) return false;

    return await findUserByEmail(email).then((user) => {
      if (user) return bcrypt.compare(password, user.password);
      return false;
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { hashing, isUserExist, checkCredentials };
