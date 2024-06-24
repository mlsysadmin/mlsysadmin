'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('roles', {
      role_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_role: {
          allowNull: false,
          type: Sequelize.ENUM('buyer', 'seller', 'support')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};