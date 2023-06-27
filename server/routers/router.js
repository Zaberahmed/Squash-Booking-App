const router = require('express').Router();
const adminController = require('./../controllers/admin/admin.controller');
const userController = require('./../controllers/user/user.controller');
const authenticator = require('./../middlewares/authenticator');

//Admin routes
router.post('/admin/login', adminController.login);
router.get('/admin/logout', adminController.logout);

router.get('/admin/members', adminController.getAllUser);
router.post('/admin/member', adminController.getUser); //Not required
router.get('/admin/bookings', adminController.getAllBookings);
router.get('/admin/booking', adminController.getBooking); //Not required
router.delete('/admin/delete-member', adminController.deleteUserByAdmin);
router.delete('/admin/delete-booking', adminController.deleteBookingByAdmin);

router.post('/admin/event', adminController.addEvent);
router.delete('/admin/delete-event', adminController.removeEvent);
router.get('/all-events', adminController.getAllEvents);

//User routes
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/logout', authenticator, userController.logout);

router.get('/profile', authenticator, userController.profile);
router.post('/available', authenticator, userController.availableSlots);
router.post('/confirm', authenticator, userController.confirmBooking);
router.post('/previous', authenticator, userController.previousBooking);
router.post('/upcomming', authenticator, userController.upcommingBooking);
router.post('/user', authenticator, userController.getUser);
router.get('/users', authenticator, userController.getAllUser);
router.delete('/cancel', authenticator, userController.deleteBookingByUser);

module.exports = router;
