'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const CustomFeaturesAndAmenities = Sequelize.define("custom_features_and_amenities", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  feature_name: {
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
  modelName: 'CustomFeaturesAndAmenities',
  timestamps: false,
})

module.exports = CustomFeaturesAndAmenities;