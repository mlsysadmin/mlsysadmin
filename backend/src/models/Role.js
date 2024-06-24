'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: "User", foreignKey: "role_id" })
    }
  }
  Role.init({
    role_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_role: {
        allowNull: false,
        type: DataTypes.ENUM('buyer', 'seller', "support")
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: "roles"
  });
  return Role;
};