const { Cuisine, User, Category } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { encodeToken } = require('../helpers/token');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



class UserController {

  static async register(req, res, next) {
    const { username, email, password, phone, address } = req.body
    try {
      const user = await User.create({ username, email, password, phoneNumber: phone, address })
      const token = encodeToken({ id: user.id });
      res.status(201).json({ access_token: token, email: user.email, role: user.role })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: '!email' };

      if (!password) throw { name: '!password' };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: '!user' };

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: '!isValidPassword' };

      const token = encodeToken({ id: user.id });

      res.json({ access_token: token, email: user.email, role: user.role });

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

      let user = await User.findOne({
        where: {
          email: payload.email
        }
      })

      if (!user) {
        user = await User.create({
          username: payload.name,
          email: payload.email,
          password: String(Math.random()),
          role: 'staff'
        })
      }

      let payload_access_token = { id: user.id };

      let token = encodeToken(payload_access_token);


      res.status(200).json({ access_token: token, email: user.email, role: user.role })
    } catch (error) {
      next(error);
    }

  }
}

module.exports = UserController;