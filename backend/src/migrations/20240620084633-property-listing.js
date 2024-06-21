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
      property_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      listing_type: {
        allowNull: false,
        type: Sequelize.ENUM("Rent", "Sell", "Preselling")
      },
      classification: {
        allowNull: false,
        type: Sequelize.ENUM("New", "Resale")
      },
      property_type: {
        allowNull: false,
        type: Sequelize.ENUM("Commercial", "Residential", "Industrial", "Others")
      },
      property_subtype: {
        allowNull: false,
        type: Sequelize.ENUM("Service Office", "Shop/Rental", "Commercial Land/Lot", "Condominium", "House & Lot", "Townhouse", "Warehouse", "Farm Lot", "Hotel/Resort")
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      photos: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      google_map_link: {
        allowNull: false,
        type: Sequelize.STRING
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
      floor_area: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      lot_area: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      price_per_sqm: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      discounted_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM("Active", "Inactive")
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
