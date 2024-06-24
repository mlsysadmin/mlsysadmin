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

    await queryInterface.createTable('indoor_features', { 
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      features: {
          allowNull: false,
          type: Sequelize.ENUM("Air Condition", "Alarm System", "Attic", "Balcony", "Bar", "Basement", "Broadband Internet", "Built-in Wardrobes", "CCTV", "Central Air Condition", "Deducted Cooling", "Deducted Vacuum System", "Driver Room",
            "Ensuite", "Entertainment Room", "Fire Alarm", "Fireplace", "Floorboards", "Gym", "Jacuzzi", "Laundry Room", "Lawn", "Library", "Maid Room", "Pay TV access", "Powder Room", "Sauna", "Service Area", "Service Kitchen", "Smoke Detector",
            "Split system heating", "Storage Room", "Study Room", "Terrace", "Wifi"
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
    await queryInterface.dropTable('indoor_features');
  }
};
