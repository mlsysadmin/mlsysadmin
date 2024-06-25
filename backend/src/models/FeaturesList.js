'use strict';
const {
    DataTypes
} = require('sequelize');

const Sequelize = require('../config/_db/mlbrokerage.db');

const FeaturesList = Sequelize.define("features_lists", {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    feature_name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    feature_type:{
        allowNull: false,
        type: DataTypes.ENUM("Indoor", "Outdoor"),
    },
    // indoor_features: {
    //     allowNull: false,
    //     type: DataTypes.ENUM("Air Condition", "Alarm System", "Attic", "Balcony", "Bar", 
    //         "Basement", "Broadband Internet", "Built-in Wardrobes", "CCTV", 
    //         "Central Air Condition", "Deducted Cooling", "Deducted Vacuum System", "Driver Room",
    //         "Ensuite", "Entertainment Room", "Fire Alarm", "Fireplace", "Floorboards", 
    //         "Gym", "Jacuzzi", "Laundry Room", "Lawn", "Library", "Maid Room", 
    //         "Pay TV access", "Powder Room", "Sauna", "Service Area", "Service Kitchen", 
    //         "Smoke Detector", "Split system heating", "Storage Room", "Study Room", 
    //         "Terrace", "Wifi"
    //     ),
    // },
    // outdoor_features: {
    //     allowNull: false,
    //     type: DataTypes.ENUM("Badminton", "Balcony", "Basketball Court", "Carport", 
    //         "Clubhouse", "Courtyard", "Fully Fenced", "Function Area", "Garage", "Garden",
    //         "Gazebos", "Jacuzzi", "Jogging path", "Lanai", "Landscape Garden", 
    //         "Multi-purpose Lawn", "Open car spaces", "Parking Lot", "Parks", 
    //         "Playground", "Remote Garage", "Secure Parking", "Shower Rooms", 
    //         "Sports Facilities", "Swimming Pool", "Tennis Court", "24/7 Security"
    //     ),
    // },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: true
      },
    //   deletedAt: {
    //     type: DataTypes.DATE,
    //     allowNull: true,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   },
}, {
    modelName: 'FeaturesList',
    timestamps: false,
})

module.exports = FeaturesList;