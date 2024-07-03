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
    master_property_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        unique: true,
        references: {
            model: {
                model: "MasterPropertyList",
                tableName: 'master_property_lists',
            },
            key: 'master_property_id',
        },
    },
    // approver_id: {
    //     allowNull: false,
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     references: {
    //         model: {
    //             model: "Approvers",
    //             tableName: 'approvers',
    //         },
    //         key: 'approver_id',
    //     },
    // },
    approval_status: {
        allowNull: false,
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'DISAPPROVED'),
        set(status) {
            this.setDataValue('approval_status', status.toUpperCase());
        }
    },
    levels: {
        allowNull: false,
        type: DataTypes.ENUM("1", "2"),
        get() {
            return Number(this.getDataValue("levels"))
        },
        set(level){
            this.setDataValue('levels', level.toString())
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
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