'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('property_listings', 'property_photos_id', {
          transaction: t
        }),
        queryInterface.addColumn('property_photos', 'property_listing_id', {
          allowNull: false,
          // primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            model: {
              model: "PropertyListing",
              tableName: 'property_listings',
            },
            key: 'property_listing_id',
          },
        },
          { transaction: t }
        )
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
