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
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    property_id: {
        allowNull: false,
        type: Sequelize.STRING(15),
        unique: true
    },
    price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
    },
    discounted_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
    },
    price_per_sqm: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
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
        type: Sequelize.INTEGER
    },
    no_of_bathrooms: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    no_of_floors: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    parking: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    floor_area: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
    },
    lot_area: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
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
