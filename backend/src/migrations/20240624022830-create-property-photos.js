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
    await queryInterface.createTable('property_photos', { 
      photos_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      property_listing_id: {
          allowNull: false,
          // primaryKey: true,
          type: Sequelize.INTEGER
      },
      photos: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      upload_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
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
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('property_photos');
  }
};
