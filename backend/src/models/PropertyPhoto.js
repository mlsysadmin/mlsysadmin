'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const PropertyPhoto = Sequelize.define("property_photos", {
  property_photos_id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED
  },
  photos: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  upload_date: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
  }
}, {
  modelName: 'PropertyPhoto',
  timestamps: false,
})

module.exports = PropertyPhoto;