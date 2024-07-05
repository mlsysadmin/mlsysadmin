'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const PropertyPhoto = Sequelize.define("property_photos", {
  property_photos_id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true
  },
  property_listing_id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: {
        model: "PropertyListing",
        tableName: 'property_listings',
      },
      key: 'property_listing_id',
    },
  },
  listing_id: {
    allowNull: false,
    type: DataTypes.STRING,
    // unique: true
  },
  photo: {
    allowNull: true,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  upload_date: {
    allowNull: true,
    type: DataTypes.DATE,
    onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  modelName: 'PropertyPhoto',
  timestamps: false,
})

module.exports = PropertyPhoto;