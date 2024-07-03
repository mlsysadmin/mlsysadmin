'use strict';
const {
    DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const SoldProperties = Sequelize.define("sold_properties", {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    property_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: {
              model: "MasterPropertyList",
              tableName: 'master_property_lists',
            },
            key: 'id',
          },
    },
    buyer_id: {
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
    sale_price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
    },
    sale_date: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
    },
}, {
    modelName: 'SoldProperties',
    timestamps: false,
})

module.exports = SoldProperties;