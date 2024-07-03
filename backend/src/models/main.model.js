'use strict'

const Role = require('./Role');
const User = require('./User');
const PropertyListing = require('./PropertyListing');
const MasterPropertyList = require('./MasterPropertyList');
const Save = require('./Save');
const PropertyViews = require('./PropertyViews');
const SoldProperties = require('./SoldProperties');
const PropertyFeaturesAndAmenities = require('./PropertyFeaturesAndAmenities');
const CustomFeaturesAndAmenities = require('./CustomFeaturesAndAmenities');
const PropertyTypes = require('./PropertyTypes');
const ListingTypes = require('./ListingTypes');
const UnitDetails = require('./UnitDetails');
const Location = require('./Location');
const Description = require('./Description');
const PropertyPhoto = require('./PropertyPhoto');

/** User Association **/ 
User.hasOne(Role, {
    foreignKey: "role_id"
});

Role.belongsTo(User, {
    foreignKey: 'role_id'
});

/* ------------------------------------------------------------------------------- */

/** Save Association **/ 
User.hasMany(Save); // done
Save.belongsTo(User, { foreignKey: 'user_id' }); // done

MasterPropertyList.hasMany(Save); // done
Save.belongsTo(MasterPropertyList, { foreignKey: 'master_property_id' }); // done

/* ------------------------------------------------------------------------------- */

/** Property Listing Association **/ 
User.hasMany(PropertyListing); // done
PropertyListing.belongsTo(User, { foreignKey: 'seller_id' }) // done

PropertyTypes.hasOne(PropertyListing); // done
PropertyListing.belongsTo(PropertyTypes, { foreignKey: 'property_type_id' }) // done

ListingTypes.hasOne(PropertyListing); // done
PropertyListing.belongsTo(ListingTypes, { foreignKey: 'listing_type' }) // done

UnitDetails.hasOne(PropertyListing); // done
PropertyListing.belongsTo(UnitDetails, { foreignKey: 'unit_details_id' }); //done

Location.hasOne(PropertyListing); // done
PropertyListing.belongsTo(Location, { foreignKey: 'location_id' }); //done

Description.hasOne(PropertyListing); // done
PropertyListing.belongsTo(Description, { foreignKey: 'description_id' }); //done

PropertyFeaturesAndAmenities.hasOne(PropertyListing); // done
PropertyListing.belongsTo(PropertyFeaturesAndAmenities, { foreignKey: 'features_id' }); //done

PropertyPhoto.hasOne(PropertyListing); // done
PropertyListing.belongsTo(PropertyPhoto, { foreignKey: 'photos_id' }); //done

/* ------------------------------------------------------------------------------- */

/** Master Property Listing Association **/ 

PropertyListing.hasOne(MasterPropertyList); // done
MasterPropertyList.belongsTo(PropertyListing, { foreignKey: 'listing_id' }); //done

User.hasMany(MasterPropertyList);// done
MasterPropertyList.belongsTo(User, { foreignKey: 'seller_id' }); // done

/* ------------------------------------------------------------------------------- */

/** Highlight Association **/ 

User.hasMany(Highlight); // done
Highlight.belongsTo(User, { foreignKey: 'user_id' }); // done

MasterPropertyList.hasMany(Highlight);  // done
Highlight.belongsTo(MasterPropertyList, { foreignKey: 'master_property_id' }); // done

/* ------------------------------------------------------------------------------- */

/** Property Views Association **/ 
User.hasMany(PropertyViews); // done
PropertyViews.belongsTo(User, { foreignKey: 'user_id' }); // done

MasterPropertyList.hasMany(PropertyViews); // done
PropertyViews.belongsTo(MasterPropertyList, { foreignKey: 'master_property_id' }); // done

/* ------------------------------------------------------------------------------- */

/** Sold Properties Association **/ 
MasterPropertyList.hasOne(SoldProperties); // done
SoldProperties.belongsTo(MasterPropertyList, { foreignKey: 'property_id' }); // done

User.hasMany(SoldProperties); // done 
SoldProperties.belongsTo(User, { foreignKey: 'user_id' }); // done

/* ------------------------------------------------------------------------------- */

/** Property Features and Amenities Association **/ 
CustomFeaturesAndAmenities.hasOne(PropertyFeaturesAndAmenities);
PropertyFeaturesAndAmenities.belongsTo(CustomFeaturesAndAmenities, { foreignKey: 'property_custom_features_id' });

/* ------------------------------------------------------------------------------- */

module.exports = {
    User,
    Role,
    MasterPropertyList,
    PropertyListing,
    Save,
    Highlight,
    PropertyViews,
    SoldProperties,
    CustomFeaturesAndAmenities,
    PropertyFeaturesAndAmenities,
    PropertyTypes,
    ListingTypes,
    UnitDetails,
    Location,
    Description,
    PropertyPhoto
}