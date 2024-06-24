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

    await queryInterface.createTable('features_and_amenities', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    indoor_features: {
        allowNull: false,
        type: Sequelize.STRING,
        get() {
            return JSON.parse(this.getDataValue('indoor_features'));
        },
        set(indoor) {
            this.setDataValue('indoor_features', JSON.stringify(indoor));
        }
    },
    outdoor_features: {
        allowNull: false,
        type: Sequelize.STRING,
        get() {
            return JSON.parse(this.getDataValue('outdoor_features'));
        },
        set(indoor) {
            this.setDataValue('outdoor_features', JSON.stringify(indoor));
        }
    },
    custom_features_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('features_and_amenities');
  }
};
