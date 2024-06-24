'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const PropertyPhoto = Sequelize.define("property_photos", {
  photos_id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  property_listing_id: {
    allowNull: false,
    // primaryKey: true,
    type: DataTypes.INTEGER,
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
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  modelName: 'PropertyPhoto',
  timestamps: false,
})

module.exports = PropertyPhoto;