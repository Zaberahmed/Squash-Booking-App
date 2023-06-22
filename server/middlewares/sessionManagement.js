const jwt = require('jsonwebtoken');

const SECRET_KEY = 'HELLO_WORLD';
const blokcedList = [];

const createSession = (userId) => {
  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 10);

  const newSession = {
    expiresAt: expiry.valueOf(),
    userId: userId,
  };

  return jwt.sign(newSession, SECRET_KEY);
};

const getSession = (token) => {
  if (blokcedList.includes(token)) return undefined;

  const sessionData = jwt.verify(token, SECRET_KEY);

  if (sessionData.expiresAt < Date.now()) {
    console.log('Token has expired.');
    return undefined;
  }

  return sessionData;
};

const destroySession = (token) => {
  blokcedList.push(token);
  return true;
};

module.exports = { createSession, getSession, destroySession };
