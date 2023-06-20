const { getSession } = require('./sessionManagement');

const authenticator = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(400).send('Token not found!');
  }

  const existingSession = getSession(token);
  if (!existingSession) {
    return res.status(400).send('Session does not exist!');
  }

  next();
};

module.exports = authenticator;
