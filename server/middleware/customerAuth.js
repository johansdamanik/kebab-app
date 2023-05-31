const { Customer, Bookmark } = require('../models');
const { decodeToken } = require('../helpers/token');

async function authentication(req, res, next) {
  try {
    const access_token = req.headers.access_token;
    if (!access_token) throw { name: 'InvalidToken' };

    const payload = decodeToken(access_token);
    
    let customer = await Customer.findByPk(payload.id);
    if (!customer) throw { name: 'InvalidToken' };

    req.user = {
      id: customer.id,
      email: customer.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

async function authorization(req, res, next) {
  try {
    const { id, email } = req.user;

    const bookmark = await Bookmark.findByPk(req.params.id);
    if (!bookmark) throw { name: '!cuisine' };

    if (id !== bookmark.CustomerId) throw { name: 'Forbidden' };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
  authorization,
};
