const { Cuisine, User, Category } = require('../models');

class CategoryController {
  static async categories(req, res, next) {
    try {
      let categories = await Category.findAll()
      res.status(200).json(categories)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
