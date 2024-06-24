'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const Location = Sequelize.define("locations", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  subdivision: {
      allowNull: false,
      type: DataTypes.STRING
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING(20)
  },
  province: {
    allowNull: false,
    type: DataTypes.STRING(20)
  },
  postal_code: {
    allowNull: false,
    type: DataTypes.STRING(10)
  },
  map_location: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
},{
  modelName: 'Location',
  timestamps: false,
})

module.exports = Location;