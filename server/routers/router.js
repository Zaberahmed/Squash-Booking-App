const router = require('express').Router();
const userController = require('./../controllers/user/user.controller');
const adminController = require('./../controllers/admin/admin.controller');
const authenticator = require('./../middlewares/authenticator');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

router.get('/profile', authenticator, userController.profile);
router.post('/available', authenticator, userController.availableSlots);
router.post('/confirm', authenticator, userController.confirmBooking);
router.post('/previous', authenticator, userController.previousBooking);
router.post('/upcomming', authenticator, userController.upcommingBooking);

router.get('/members', adminController.getAllMember);

module.exports = router;
