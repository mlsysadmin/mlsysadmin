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
    await queryInterface.createTable('outdoor_features', { 
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      features: {
          allowNull: false,
          type: Sequelize.ENUM("Badminton", "Balcony", "Basketball Court", "Carport", "Clubhouse", "Courtyard", "Fully Fenced", "Function Area", "Garage", "Garden", "Gazebos", "Jacuzzi", "Jogging path", "Lanai", "Landscape Garden",
            "Multi-purpose Lawn", "Open car spaces", "Parking Lot", "Parks", "Playground", "Remote Garage", "Secure Parking", "Shower Rooms", "Sports Facilities", "Swimming Pool", "Tennis Court"
          ),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
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
    await queryInterface.dropTable('outdoor_features');
  }
};
