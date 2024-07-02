'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const Location = Sequelize.define("locations", {
  location_id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED
  },
  subdivision: {
      allowNull: false,
      type: DataTypes.STRING(60)
  },
  barangay: {
    allowNull: false,
    type: DataTypes.STRING(30)
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING(30)
  },
  province: {
    allowNull: false,
    type: DataTypes.STRING(30)
  },
  map_location: {
    allowNull: false,
    type: DataTypes.STRING
  }
},{
  modelName: 'Location',
  timestamps: false,
})

module.exports = Location;