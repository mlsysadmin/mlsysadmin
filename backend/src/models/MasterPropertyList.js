'use strict'

const { DataTypes } = require('sequelize');
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
    property_listing_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: {
        allowNull: false,
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
        defaultValue: "Pending"
    },
    approval_date: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
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
},
    {
        modelName: 'MasterPropertyList',
        timestamps: false,
    }
)

module.exports = MasterPropertyList;