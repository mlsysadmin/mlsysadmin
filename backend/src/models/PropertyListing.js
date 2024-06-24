'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const PropertyListing = Sequelize.define("property_listings", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING
  },
  property_id: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  seller_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  property_type_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  listing_type: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  unit_details_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  location_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  description_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  features_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  photos_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  listing_status: {
    allowNull: false,
    type: DataTypes.ENUM('OPEN', 'APPROVED', 'DISAPPROVED')
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
  modelName: 'PropertyListing',
  timestamps: false,
})

module.exports = PropertyListing;