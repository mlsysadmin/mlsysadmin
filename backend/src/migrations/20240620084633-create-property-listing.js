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
    await queryInterface.createTable('property_listings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      property_id: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      property_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      listing_type: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      unit_details_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      features_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      photos_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      listing_status: {
        allowNull: false,
        type: Sequelize.ENUM('OPEN', 'APPROVED', 'DISAPPROVED')
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("property_listings");
  }
};
