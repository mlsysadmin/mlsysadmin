'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
        primaryKey: true
      },
      listing_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      property_id: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      features_and_amenities_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      custom_features_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      listing_status: {
        allowNull: false,
        type: Sequelize.ENUM('OPEN', 'APPROVED', 'DISAPPROVED')
      },
      property_status: {
        allowNull: false,
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE', 'SOLD')
      },
      approval_date: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
        allowNull: true
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      },
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("master_property_lists")
  }
};
