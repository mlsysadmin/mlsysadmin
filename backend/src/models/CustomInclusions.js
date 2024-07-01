'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const CustomInclusions = Sequelize.define("custom_inclusions", {
  custom_inclusion_id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED
  },
  inclusion_name: {
      allowNull: false,
      type: DataTypes.STRING,
      get(){
        return JSON.parse(this.getDataValue('feature_name'));
      },
      set (name) {
        this.setDataValue('feature_name', JSON.stringify(name));
      }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
},{
  modelName: 'CustomInclusions',
  timestamps: false,
})

module.exports = CustomInclusions;