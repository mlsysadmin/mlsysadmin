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
    type: DataTypes.INTEGER,
    references: {
      model: {
        model: "User",
        tableName: 'users',
      },
      key: 'user_id',
    },
  },
  property_type_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: {
        model: "PropertyTypes",
        tableName: 'property_types',
      },
      key: 'id',
    },
  },
  listing_type: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: {
        model: "ListingTypes",
        tableName: 'listing_types',
      },
      key: 'id',
    },
  },
  unit_details_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: {
        model: "UnitDetails",
        tableName: 'unit_details',
      },
      key: 'id',
    },
  },
  location_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: {
        model: "Location",
        tableName: 'locations',
      },
      key: 'id',
    },
  },
  description_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: {
        model: "Description",
        tableName: 'descriptions',
      },
      key: 'id',
    },
  },
  features_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: {
        model: "PropertyFeaturesAndAmenities",
        tableName: 'property_features_and_amenities',
      },
      key: 'id',
    },
  },
  photos_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: {
        model: "PropertyPhoto",
        tableName: 'property_photos',
      },
      key: 'photos_id',
    },
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