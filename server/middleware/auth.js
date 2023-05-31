const { User, Cuisine } = require('../models');
const { decodeToken } = require('../helpers/token');

async function authentication(req, res, next) {
    try {
        const access_token = req.headers.access_token;
        if (!access_token) throw { name: 'InvalidToken' };

        const payload = decodeToken(access_token);

        let user = await User.findByPk(payload.id);
        if (!user) throw { name: 'InvalidToken' };

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        next();
    } catch (error) {
        next(error);
    }
}

async function authorization(req, res, next) {
    try {
        const { id, role, email } = req.user;

        const cuisine = await Cuisine.findByPk(req.params.id);
        if (!cuisine) throw { name: '!cuisine' }

        if (role === 'admin') return next();

        if (id !== cuisine.authorId) throw { name: 'Forbidden' };
        
        if (id !== cuisine.authorId && role !== 'admin') throw { name: 'Forbidden' };

        next();
    } catch (error) {
        next(error);
    }
}

async function authorizationStatus(req, res, next) {
    try {
        const { id, role, email } = req.user;

        const cuisine = await Cuisine.findByPk(req.params.id);
        if (!cuisine) throw { name: '!cuisine' }

        if (role !== 'admin') throw { name: 'ForbiddenStatus' };

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authentication,
    authorization,
    authorizationStatus
}