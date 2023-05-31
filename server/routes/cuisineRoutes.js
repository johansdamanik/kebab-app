const CuisineController = require('../controllers/cuisineController');
const { authorization, authorizationStatus } = require('../middleware/auth');

const router = require('express').Router();


router.get('/', CuisineController.cuisines);

router.post('/', CuisineController.newCuisine);

router.get('/:id', authorization, CuisineController.cuisinesById);

router.put('/:id', authorization, CuisineController.updateCuisine);

router.patch('/:id', authorizationStatus, CuisineController.updateCuisineStatus);

router.delete('/:id', authorization, CuisineController.deleteCuisine);

module.exports = router;