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
    await queryInterface.createTable('sold_properties', { 
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    property_id: {
        allowNull: false,
        type: Sequelize.STRING(15),
    },
    buyer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    sale_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
    },
    sale_date: {
      allowNull: false,
      type: Sequelize.DATE,
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
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('sold_properties');
  }
};
