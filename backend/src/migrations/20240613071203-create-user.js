'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    function notNullIfUserIsSeller(instance) {
      if (instance.role_id === 2 && (instance.license === null || instance.license === undefined)) {
        throw new Error('license cannot be null if user_role is seller');
      }
    }

    await queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ckyc_id: {
          allowNull: false,
          type: Sequelize.STRING(25)
      },
      mobile_number: {
          allowNull: false,
          type: Sequelize.STRING(15),
      },
      first_name: {
          allowNull: false,
          type: Sequelize.STRING(60)
      },
      middle_name: {
          allowNull: true,
          type: Sequelize.STRING(60)
      },
      last_name: {
          allowNull: false,
          type: Sequelize.STRING(60)
      },
      suffix: {
          allowNull: false,
          type: Sequelize.STRING(5)
      },
      birth_date: {
          allowNull:false,
          type: Sequelize.DATEONLY
      },
      email: {
          allowNull: false,
          type: Sequelize.STRING(100)
      },
      password: {
          allowNull: false,
          type: Sequelize.STRING(100)
      },
      user_desc: {
          allowNull: false,
          type: Sequelize.STRING(255)
      },
      role_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              model: "Role",
              tableName: 'roles',
            },
            key: 'role_id',
          },
      },
      license: {
        allowNull: true,
        validate: {
            notNullIfUserIsSeller(value) {
                notNullIfUserIsSeller(this)
            }
        },
        type: Sequelize.BLOB
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};