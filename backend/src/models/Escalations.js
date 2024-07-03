'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const Escalations = Sequelize.define("escalations", {
  escalation_id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED
  },
  approver_id: {
    allowNull: false,
    type: DataTypes.INTEGER.UNSIGNED,
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
    type: DataTypes.INTEGER.UNSIGNED,
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
    type: DataTypes.ENUM("PENDING", "APPROVED", "DISAPPROVED"),
  },
  approved_at: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  remarks: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
}, {
  modelName: 'Escalations',
  timestamps: false,
})

module.exports = Escalations;