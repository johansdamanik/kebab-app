const CuisineController = require('../controllers/cuisineController');
const { authentication } = require('../middleware/auth');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.use('/pub', require('./customerRoutes'));

router.use('/users', require('./userRoutes'));

router.use(authentication);

router.use('/cuisines', require('./cuisineRoutes'));

router.use('/categories', require('./categoryRoutes'));

router.get('/history', CuisineController.getHistories);

module.exports = router;