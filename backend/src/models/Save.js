'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const Save = Sequelize.define("saves", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: {
          model: "User",
          tableName: 'users',
        },
        key: 'user_id',
      },
  },
  master_property_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: {
        model: "MasterPropertyList",
        tableName: 'master_property_lists',
      },
      key: 'id',
    },
  },
  liked_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
  }
},{
  modelName: 'Save',
  timestamps: false,
})

module.exports = Save;