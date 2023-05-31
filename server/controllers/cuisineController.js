const { Cuisine, User, Category, History } = require('../models');
const { Op } = require('sequelize');

class CuisineController {
  static async cuisines(req, res, next) {
    try {
      let cuisines = await Cuisine.findAll({
        where: {
          status: {
            [Op.ne]: 'Archived',
          },
        },
        include: {
          model: User,
          attributes: { exclude: ['password'] },
        },
        order: [['id', 'ASC']],
      });
      res.status(200).json(cuisines);
    } catch (error) {
      next(error);
    }
  }

  static async cuisinesById(req, res, next) {
    const { id } = req.params;
    try {
      let cuisine = await Cuisine.findByPk(id);
      if (!cuisine) throw { name: '!cuisine' };

      res.status(200).json(cuisine);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCuisine(req, res, next) {
    let { id } = req.params;
    try {
      let cuisine = await Cuisine.findByPk(id);
      if (!cuisine) throw { name: '!cuisine' };

      await Cuisine.destroy({ where: { id } });
      res.status(200).json({ message: `Cuisine ${cuisine.name} has been deleted` });
    } catch (error) {
      next(error);
    }
  }

  static async newCuisine(req, res, next) {
    const { name, description, price, imgUrl, categoryId } = req.body;
    try {
      let cuisine = await Cuisine.create({ name, description, price, imgUrl, authorId: req.user.id, categoryId });
      let user = await User.findByPk(cuisine.authorId);
      let newHistory = await History.create({
        title: cuisine.name,
        description: `New Cuisine with ${cuisine.id} has been created`,
        updatedBy: user.email,
      });
      res.status(201).json(cuisine);
    } catch (error) {
      next(error);
    }
  }

  static async updateCuisine(req, res, next) {
    const { name, description, price, imgUrl, categoryId } = req.body;
    const { id } = req.params;
    try {
      let cuisine = await Cuisine.update({ name, description, price, imgUrl, categoryId }, { where: { id } });
      let cuisineData = await Cuisine.findByPk(id);
      let newHistory = await History.create({
        title: cuisineData.name,
        description: `Cuisine with id ${id} has been updated`,
        updatedBy: req.user.email,
      });
      res.status(200).json(cuisine);
    } catch (error) {
      next(error);
    }
  }

  static async updateCuisineStatus(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      let cuisineData = await Cuisine.findByPk(id);
      let cuisine = await Cuisine.update({ status }, { where: { id } });
      let newHistory = await History.create({
        title: cuisineData.name,
        description: `Cuisine with id ${cuisineData.id} status has been updated from ${cuisineData.status} into ${status}`,
        updatedBy: req.user.email,
      });
      res.status(200).json(cuisine);
    } catch (error) {
      next(error);
    }
  }

  static async getHistories(req, res, next) {
    try {
      const histories = await History.findAll({
        order: [['updatedAt', 'DESC']],
      });
      res.status(200).json(histories);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CuisineController;
