'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('locations', { 
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      subdivision: {
          allowNull: false,
          type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      province: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      postal_code: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      map_location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('locations');
  }
};
