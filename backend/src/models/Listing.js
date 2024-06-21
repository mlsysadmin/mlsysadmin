'use strict';
const {
  DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const Listing = Sequelize.define("property_listings", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING
  },
  seller_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  listing_type: {
    allowNull: false,
    type: DataTypes.ENUM("Rent", "Sell", "Preselling")
  },
  classification: {
    allowNull: false,
    type: DataTypes.ENUM("New", "Resale")
  },
  property_type: {
    allowNull: false,
    type: DataTypes.ENUM("Commercial", "Residential", "Industrial", "Others")
  },
  property_subtype: {
    allowNull: false,
    type: DataTypes.ENUM("Service Office", "Shop/Rental", "Commercial Land/Lot", "Condominium", "House & Lot", "Townhouse", "Warehouse", "Farm Lot", "Hotel/Resort")
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  photos: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  google_map_link: {
    allowNull: false,
    type: DataTypes.STRING
  },
  no_of_beds: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  no_of_bathrooms: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  no_of_floors: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  floor_area: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  lot_area: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  price_per_sqm: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  discounted_price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  status: {
    allowNull: false,
    type: DataTypes.ENUM("Active", "Inactive")
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
  modelName: 'Listing',
  timestamps: false,
})

module.exports = Listing;