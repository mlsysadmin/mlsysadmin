'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('property_listings', {
      property_listing_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true
    
      },
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: {
            model: "User",
            tableName: 'users',
          },
          key: 'user_id',
        },
      },
      property_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: {
            model: "PropertyTypes",
            tableName: 'property_types',
          },
          key: 'property_type_id',
        },
      },
      listing_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: {
            model: "ListingTypes",
            tableName: 'listing_types',
          },
          key: 'listing_type_id',
        },
      },
      unit_detail_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: {
            model: "UnitDetails",
            tableName: 'unit_details',
          },
          key: 'unit_detail_id',
        },
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: {
            model: "Location",
            tableName: 'locations',
          },
          key: 'location_id',
        },
      },
      amenity_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: {
            model: "Amenities",
            tableName: 'amenities',
          },
          key: 'amenity_id',
        },
      },
      property_photos_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: {
            model: "PropertyPhoto",
            tableName: 'property_photos',
          },
          key: 'property_photos_id',
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      listing_status: {
        allowNull: false,
        type: Sequelize.ENUM('OPEN', 'APPROVED', 'DISAPPROVED')
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("property_listings");
  }
};
