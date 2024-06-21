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
    await queryInterface.createTable("master_property_lists", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    property_listing_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: {
            model: "Listing",
            tableName: 'property_listings',
          },
          key: 'property_id',
        },
    },
    status: {
        allowNull: false,
        type: Sequelize.ENUM("Pending", "Approved", "Rejected"),
        defaultValue: "Pending"
    },
    approval_date: {
        allowNull: true,
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
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
    await queryInterface.dropTable("master_property_lists")
  }
};
