'use strict'

const Role = require('./Role');
const User = require('./User');
const PropertyListing = require('./PropertyListing');
const MasterPropertyList = require('./MasterPropertyList');
const Save = require('./Save');
const PropertyViews = require('./PropertyViews');
const SoldProperties = require('./SoldProperties');
const Amenities = require('./Amenities');
const CustomAmenities = require('./CustomAmenities');
const PropertyTypes = require('./PropertyTypes');
const ListingTypes = require('./ListingTypes');
const UnitDetails = require('./UnitDetails');
const Location = require('./Location');
const PropertyPhoto = require('./PropertyPhoto');
const Highlight = require('./HighLight');
const Approvals = require('./Approvals');
const Approvers = require('./Approvers');
const FeaturesLists = require('./FeaturesList');
const CustomInclusions = require('./CustomInclusions'); 

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
PropertyListing.belongsTo(ListingTypes, { foreignKey: 'listing_type_id' }) // done

UnitDetails.hasOne(PropertyListing); // done
PropertyListing.belongsTo(UnitDetails, { foreignKey: 'unit_details_id' }); //done

Location.hasOne(PropertyListing); // done
PropertyListing.belongsTo(Location, { foreignKey: 'location_id' }); //done

Amenities.hasOne(PropertyListing); // done
PropertyListing.belongsTo(Amenities, { foreignKey: 'amenity_id' }); //done

PropertyPhoto.hasOne(PropertyListing); // done
PropertyListing.belongsTo(PropertyPhoto, { foreignKey: 'property_photos_id' }); //done

/* ------------------------------------------------------------------------------- */

/** Master Property Listing Association **/ 

PropertyListing.hasOne(MasterPropertyList); // done
MasterPropertyList.belongsTo(PropertyListing, { foreignKey: 'property_listing_id' }); //done

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
SoldProperties.belongsTo(MasterPropertyList, { foreignKey: 'master_property_id' }); // done

User.hasMany(SoldProperties); // done 
SoldProperties.belongsTo(User, { foreignKey: 'user_id' }); // done

/* ------------------------------------------------------------------------------- */

/** Property Amenities Association **/ 
CustomAmenities.hasOne(Amenities);
Amenities.belongsTo(CustomAmenities, { foreignKey: 'custom_amenity_id' });

CustomInclusions.hasOne(Amenities);
Amenities.belongsTo(CustomInclusions, { foreignKey: 'custom_inclusion_id' });

/* ------------------------------------------------------------------------------- */


/** Property Approvals Association **/ 
Approvals.hasOne(Approvers);
Approvers.belongsTo(Approvals, { foreignKey: 'approver_id' });

Approvals.hasOne(PropertyListing);
PropertyListing.belongsTo(Approvals, { foreignKey: 'property_listing_id' });

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
    CustomAmenities,
    Amenities,
    PropertyTypes,
    ListingTypes,
    UnitDetails,
    Location,
    PropertyPhoto,
    FeaturesLists,
    Approvals,
    Approvers,
    CustomInclusions
}