'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.belongsToMany(models.Cuisine, { through: models.Bookmark, foreignKey: 'CustomerId'})
    }
  }
  Customer.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          msg: 'Email is already used',
        },
        validate: {
          notNull: {
            msg: 'Email is required',
          },
          notEmpty: {
            msg: 'Email is required',
          },
          isEmail: {
            args: true,
            msg: 'Invalid email format',
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'Password is required',
          },
          notEmpty: {
            msg: 'Password is required',
          },
          len: {
            args: [5],
            msg: 'Password must be at least 5 characters long'
          }
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer',
      },
    },
    {
      sequelize,
      modelName: 'Customer',
    }
  );
  Customer.beforeCreate((customer) => {
    customer.password = hashPassword(customer.password);
  });
  return Customer;
};
