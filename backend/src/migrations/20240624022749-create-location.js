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
      location_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      subdivision: {
          allowNull: false,
          type: Sequelize.STRING(60)
      },
      barangay: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      province: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      postal_code: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      map_location: {
        allowNull: false,
        type: Sequelize.STRING
      }
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
