'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const PropertyTypes = Sequelize.define("property_types", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  type: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.ENUM("Commercial", "Residential", "Industrial")
  },
  subtype: {
    allowNull: false,
    type: DataTypes.ENUM("Service Office", "Shop/Retail", "Commercial Land/Lot", "Condominium", "House & Lot", "Townhouse", "Warehouse", "Farm Lot", "Hotel/Resort")
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
},{
  modelName: 'PropertyTypes',
  timestamps: false,
})

module.exports = PropertyTypes;