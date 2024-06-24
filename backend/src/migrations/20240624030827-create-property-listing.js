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
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      property_id: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
        references: {
          model: {
            model: "PropertyTypes",
            tableName: 'property_types',
          },
          key: 'id',
        },
      },
      listing_type: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            model: "ListingTypes",
            tableName: 'listing_types',
          },
          key: 'id',
        },
      },
      unit_details_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            model: "UnitDetails",
            tableName: 'unit_details',
          },
          key: 'id',
        },
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            model: "Location",
            tableName: 'locations',
          },
          key: 'id',
        },
      },
      description_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            model: "Description",
            tableName: 'descriptions',
          },
          key: 'id',
        },
      },
      features_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            model: "PropertyFeaturesAndAmenities",
            tableName: 'property_features_and_amenities',
          },
          key: 'id',
        },
      },
      photos_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            model: "PropertyPhoto",
            tableName: 'property_photos',
          },
          key: 'photos_id',
        },
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
      },
      deletedAt: {
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
