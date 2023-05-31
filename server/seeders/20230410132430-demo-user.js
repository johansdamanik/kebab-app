'use strict';
const fs = require('fs');

const bcryptjs = require('bcryptjs');
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8')).map(el => {
      el.createdAt = el.updatedAt = new Date();
      el.role = 'admin';
      el.password = hashPassword(el.password);
      return el;
    })
    await queryInterface.bulkInsert('Users', users, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
