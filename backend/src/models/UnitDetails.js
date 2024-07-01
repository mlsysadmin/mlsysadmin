'use strict'

const { DataTypes } = require('sequelize');
const Sequelize = require('../config/_db/mlbrokerage.db');

const UnitDetails = Sequelize.define('unit_details', {
    unit_detail_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    discounted_price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    price_per_sqm: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    furnishing: {
        allowNull: false,
        type: DataTypes.ENUM("YES", "NO", "SEMI")
    },
    classification: {
        allowNull: false,
        type: DataTypes.ENUM("New", "Resale")
    },
    no_of_beds: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED
    },
    no_of_bathrooms: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED
    },
    no_of_floors: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED
    },
    parking: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED
    },
    floor_area: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    lot_area: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: true
    },
}, {
    modelName: 'UnitDetails',
    timestamps: false,
})

module.exports = UnitDetails;