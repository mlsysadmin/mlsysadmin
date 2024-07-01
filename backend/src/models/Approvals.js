'use strict';
const {
    DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const Approvals = Sequelize.define("approvals", {
    approval_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED
    },
    level: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED
    },
    property_listing_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: {
              model: "PropertyListing",
              tableName: 'property_listings',
            },
            key: 'property_listing_id',
        },
    },
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: {
              model: "User",
              tableName: 'users',
            },
            key: 'user_id',
        },
    },
    approval_status: {
        allowNull: false,
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'DISAPPROVED'),
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    modelName: 'Approvals',
    timestamps: false,
})

module.exports = Approvals;