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
  property_type_id:{
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
  }
}, {
  modelName: 'PropertyListing',
  timestamps: false,
})

module.exports = PropertyListing;