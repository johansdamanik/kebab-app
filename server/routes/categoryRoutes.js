const CategoryController = require('../controllers/categoryController');

const router = require('express').Router();


router.get('/', CategoryController.categories);


module.exports = router;