const { Cuisine, User, Category, Customer, Bookmark } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { encodeToken } = require('../helpers/token');
const { OAuth2Client } = require('google-auth-library');
const { Op } = require('sequelize');
const axios = require('axios');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class CustomerController {
  static async register(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await Customer.create({ email, password });
      const token = encodeToken({ id: user.id });
      res.status(201).json({ access_token: token, email: user.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: '!email' };

      if (!password) throw { name: '!password' };

      const user = await Customer.findOne({ where: { email } });
      if (!user) throw { name: '!user' };

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: '!isValidPassword' };

      const token = encodeToken({ id: user.id });

      res.status(200).json({ access_token: token, email: user.email, role: user.role });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const google_token = req.headers.google_token;

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      let user = await Customer.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        user = await Customer.create({
          email: payload.email,
          password: String(Math.random()),
          role: 'customer',
        });
      }

      let payload_access_token = { id: user.id };

      let token = encodeToken(payload_access_token);

      res.status(200).json({ access_token: token, email: user.email, role: user.role });
    } catch (error) {
      next(error);
    }
  }

  static async cuisines(req, res, next) {
    const { page, filter, price, category } = req.query;

    let query = {
      limit: 9,
      where: { status: 'Active' },
      order: [['id', 'ASC']],
    };

    if (page) {
      query.offset = (page - 1) * query.limit;
    }

    if (filter) {
      query.where.name = {
        [Op.iLike]: `%${filter}%`,
      };
    }

    if (price) {
      query.order = [['price', price === 'min' ? 'ASC' : 'DESC']];
    }

    if (category) {
      query.where.categoryId = category;
    }

    try {
      const result = await Cuisine.findAndCountAll(query);
      const data = {
        currentPage: +page || 1,
        cuisines: result.rows,
        totalPage: Math.ceil(result.count / query.limit),
      };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async cuisineById(req, res, next) {
    const { id } = req.params;
    try {
      let cuisine = await Cuisine.findByPk(id);
      if (!cuisine) throw { name: '!cuisine' };

      res.status(200).json(cuisine);
    } catch (error) {
      next(error);
    }
  }

  static async categories(req, res, next) {
    try {
      let categories = await Category.findAll({
        order: [['id', 'ASC']],
      });
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async addBookmark(req, res, next) {
    try {
      const CustomerId = req.user.id;
      const CuisineId = req.params.id;

      const cuisine = await Cuisine.findByPk(CuisineId);
      if (!cuisine) throw { name: '!cuisine' };

      const duplicate = await Bookmark.findOne({
        where: { CustomerId, CuisineId },
      });

      if (duplicate) throw { name: 'duplicate' };

      const data = await Bookmark.create({ CustomerId, CuisineId });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async fetchBookmark(req, res, next) {
    try {
      const bookmarks = await Bookmark.findAll({
        where: { CustomerId: req.user.id },
        include: { model: Cuisine },
      });
      res.status(200).json(bookmarks);
    } catch (error) {
      next(error);
    }
  }

  static async createQRCode(req, res, next) {
    try {
      const baseUrl = 'https://api.qr-code-generator.com/v1/create?access-token=CqGqLAzyQh1swKk0N7voVXHwcaoYXjYp5zEcXsMQ2lyi1v2_LQE2c8uoZg_Gh2l_';

      const { id } = req.params;
      const { data } = await axios({
        url: baseUrl,
        method: 'POST',
        data: {
          frame_name: 'bottom-frame',
          qr_code_text: 'https://kebab-customer.web.app/cuisine/' + id,
          image_format: 'SVG',
          frame_color: '#fb923c',
          frame_text_color: '#ffffff',
          frame_icon_name: 'mobile',
          frame_text: 'Scan me',
          marker_left_template: 'version13',
          marker_right_template: 'version13',
          marker_bottom_template: 'version13',
        },
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
