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
    await queryInterface.createTable('unit_details', { 
        unit_detail_id: {
            allowNull: false,
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        price: {
            allowNull: false,
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0
        },
        discounted_price: {
            allowNull: false,
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0
        },
        price_per_sqm: {
            allowNull: false,
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0
        },
        furnishing: {
            allowNull: false,
            type: Sequelize.ENUM("YES", "NO", "SEMI")
        },
        classification: {
            allowNull: false,
            type: Sequelize.ENUM("New", "Resale")
        },
        no_of_beds: {
            allowNull: false,
            type: Sequelize.INTEGER.UNSIGNED
        },
        no_of_bathrooms: {
            allowNull: false,
            type: Sequelize.INTEGER.UNSIGNED
        },
        no_of_floors: {
            allowNull: false,
            type: Sequelize.INTEGER.UNSIGNED
        },
        parking: {
            allowNull: false,
            type: Sequelize.INTEGER.UNSIGNED
        },
        floor_area: {
            allowNull: false,
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0
        },
        lot_area: {
            allowNull: false,
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue:Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
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

    await queryInterface.dropTable('unit_details');
  }
};
