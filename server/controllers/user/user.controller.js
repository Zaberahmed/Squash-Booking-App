const {
  hashing,
  isUserExist,
  checkCredentials,
} = require('./helper.controller');

const {
  createSession,
  getSession,
  destroySession,
} = require('./../../middlewares/sessionManagement');

const {
  createUser,
  findUserByEmail,
} = require('./../../models/user/user.model');

const {
  getAllBookingSlotsByDate,
} = require('./../../models/booking/booking.model');

const registration = async (req, res) => {
  try {
    const { name, membershipId, userRole, email, phone, password } = req.body;

    if (await isUserExist(email)) {
      res.status(401).send('email already exists!');
      return;
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
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!(await isUserExist(email))) {
      res.status(400).send('There is no user with that email!');
      return;
    }

    const isCredentialsOk = await checkCredentials(email, password);
    if (!isCredentialsOk) {
      res.status(401).send('Invalid password!');
      return;
    }

    const token = createSession(email);

    res.cookie('accessToken', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'Strict',
    });

    res.status(200).send({ accessToken: token });
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
    res.status(200).send('successfully logged out!');
  } catch (error) {
    console.log(error);
  }
};

const profile = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const session = getSession(token);

    const profile = await findUserByEmail(session.userEmail);

    res.status(200).send(profile);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const availableSlots = async (req, res) => {
  try {
    const { date } = req.body;

    const bookedSlots = await getAllBookingSlotsByDate(date);

    console.log(date);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const confirmBooking = async (req, res) => {
  try {
    const { date, slot, peer } = req.body;
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const previousBooking = async (req, res) => {
  try {
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const upcommingBooking = async (req, res) => {
  try {
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
