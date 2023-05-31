const CustomerController = require('../controllers/customerController');
const { authentication, authorization } = require('../middleware/customerAuth');

const router = require('express').Router();

router.post('/register', CustomerController.register);

router.post('/login', CustomerController.login);

router.post('/google-login', CustomerController.googleLogin);

router.get('/cuisines', CustomerController.cuisines);

router.get('/cuisines/:id', CustomerController.cuisineById);

router.get('/categories', CustomerController.categories);

router.get('/qr-code/:id', CustomerController.createQRCode);

router.use(authentication)

router.get('/bookmark', CustomerController.fetchBookmark)

router.post('/bookmark/:id', CustomerController.addBookmark)

module.exports = router;
