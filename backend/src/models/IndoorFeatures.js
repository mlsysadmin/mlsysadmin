'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const IndoorFeatures = Sequelize.define("indoor_features", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  features: {
      allowNull: false,
      type: DataTypes.ENUM("Air Condition", "Alarm System", "Attic", "Balcony", "Bar", "Basement", "Broadband Internet", "Built-in Wardrobes", "CCTV", "Central Air Condition", "Deducted Cooling", "Deducted Vacuum System", "Driver Room",
        "Ensuite", "Entertainment Room", "Fire Alarm", "Fireplace", "Floorboards", "Gym", "Jacuzzi", "Laundry Room", "Lawn", "Library", "Maid Room", "Pay TV access", "Powder Room", "Sauna", "Service Area", "Service Kitchen", "Smoke Detector",
        "Split system heating", "Storage Room", "Study Room", "Terrace", "Wifi"
      ),
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
  modelName: 'IndoorFeatures',
  timestamps: false,
})

module.exports = IndoorFeatures;