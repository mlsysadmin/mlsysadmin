'use strict'

const { DataTypes, DATE } = require('sequelize');
const Sequelize = require('../config/_db/mlbrokerage.db');

const MasterPropertyList = Sequelize.define("master_property_lists", {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    seller_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    listing_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    property_id: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    features_and_amenities_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    custom_features_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    listing_status: {
        allowNull: false,
        type: DataTypes.ENUM('OPEN', 'APPROVED', 'DISAPPROVED')
    },
    property_status: {
        allowNull: false,
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'SOLD')
    },
    approval_date: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
        allowNull: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    
    property_listing_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: {
        allowNull: false,
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
        defaultValue: "Pending"
    },
},
    {
        modelName: 'MasterPropertyList',
        timestamps: false,
    }
)

module.exports = MasterPropertyList;