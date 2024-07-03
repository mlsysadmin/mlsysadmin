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
    await queryInterface.createTable('escalations', { 
      escalation_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      approver_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: {
            model: "Approvers",
            tableName: 'approvers',
          },
          key: 'approver_id',
        },
      },
      approval_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: {
            model: "Approvals",
            tableName: 'approvals',
          },
          key: 'approval_id',
        },
      },
      approval_status: {
        allowNull: false,
        type: Sequelize.ENUM("PENDING", "APPROVED", "DISAPPROVED"),
      },
      approved_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      remarks: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
    await queryInterface.dropTable('escalations');
  }
};
