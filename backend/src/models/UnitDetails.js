'use strict'

const { DataTypes } = require('sequelize');
const Sequelize = require('../config/_db/mlbrokerage.db');

const UnitDetails = Sequelize.define('unit_details', {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    property_id: {
        allowNull: false,
        type: DataTypes.STRING(15),
        unique: true
    },
    price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
    },
    discounted_price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2)
    },
    price_per_sqm: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2)
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
    parking: {
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