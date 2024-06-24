'use strict';
const {
    DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const PropertyFeaturesAndAmenities = Sequelize.define("property_features_and_amenities", {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    indoor_features: {
        allowNull: false,
        type: DataTypes.STRING,
        get() {
            return JSON.parse(this.getDataValue('indoor_features'));
        },
        set(indoor) {
            this.setDataValue('indoor_features', JSON.stringify(indoor));
        }
    },
    outdoor_features: {
        allowNull: false,
        type: DataTypes.STRING,
        get() {
            return JSON.parse(this.getDataValue('outdoor_features'));
        },
        set(indoor) {
            this.setDataValue('outdoor_features', JSON.stringify(indoor));
        }
    },
    property_custom_features_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: {
              model: "CustomFeaturesAndAmenities",
              tableName: 'custom_features_and_amenities',
            },
            key: 'id',
        },
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
    }
}, {
    modelName: 'PropertyFeaturesAndAmenities',
    timestamps: false,
})

module.exports = PropertyFeaturesAndAmenities;