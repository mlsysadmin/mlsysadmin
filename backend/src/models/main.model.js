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
const Escalations = require('./Escalations');

/** User Association **/ 
User.hasOne(Role, {
    foreignKey: "role_id"
});

Role.belongsTo(User, {
    foreignKey: 'role_id'
});

/* ------------------------------------------------------------------------------- */

/** Save Association **/ 
User.hasMany(Save, { foreignKey: 'user_id' }); // done
Save.belongsTo(User, { foreignKey: 'user_id' }); // done

MasterPropertyList.hasMany(Save, { foreignKey: 'master_property_id' }); // done
Save.belongsTo(MasterPropertyList, { foreignKey: 'master_property_id' }); // done

/* ------------------------------------------------------------------------------- */

/** Property Listing Association **/ 
User.hasMany(PropertyListing, { foreignKey: 'seller_id' }); // done
PropertyListing.belongsTo(User, { foreignKey: 'seller_id' }) // done

PropertyTypes.hasOne(PropertyListing, { foreignKey: 'property_type_id' }); // done
PropertyListing.belongsTo(PropertyTypes, { foreignKey: 'property_type_id' }) // done

ListingTypes.hasOne(PropertyListing, { foreignKey: 'listing_type_id' }); // done
PropertyListing.belongsTo(ListingTypes, { foreignKey: 'listing_type_id' }) // done

UnitDetails.hasOne(PropertyListing, { foreignKey: 'unit_detail_id' }); // done
PropertyListing.belongsTo(UnitDetails, { foreignKey: 'unit_detail_id' }); //done

Location.hasOne(PropertyListing, { foreignKey: 'location_id' }); // done
PropertyListing.belongsTo(Location, { foreignKey: 'location_id' }); //done

Amenities.hasOne(PropertyListing, { foreignKey: 'amenity_id' }); // done
PropertyListing.belongsTo(Amenities, { foreignKey: 'amenity_id' }); //done

/* ------------------------------------------------------------------------------- */

/** Master Property Listing Association **/ 
PropertyListing.hasOne(PropertyPhoto, { foreignKey: 'property_listing_id' }); // done
PropertyPhoto.belongsTo(PropertyListing, { foreignKey: 'property_listing_id' }); //done

/* ------------------------------------------------------------------------------- */

/** Master Property Listing Association **/ 

PropertyListing.hasOne(MasterPropertyList, { foreignKey: 'property_listing_id' }); // done
MasterPropertyList.belongsTo(PropertyListing, { foreignKey: 'property_listing_id' }); //done

User.hasMany(MasterPropertyList, { foreignKey: 'seller_id' });// done
MasterPropertyList.belongsTo(User, { foreignKey: 'seller_id' }); // done

/* ------------------------------------------------------------------------------- */

/** Highlight Association **/ 

User.hasMany(Highlight, { foreignKey: 'user_id' }); // done
Highlight.belongsTo(User, { foreignKey: 'user_id' }); // done

MasterPropertyList.hasMany(Highlight, { foreignKey: 'master_property_id' });  // done
Highlight.belongsTo(MasterPropertyList, { foreignKey: 'master_property_id' }); // done

/* ------------------------------------------------------------------------------- */

/** Property Views Association **/ 
User.hasMany(PropertyViews, { foreignKey: 'user_id' }); // done
PropertyViews.belongsTo(User, { foreignKey: 'user_id' }); // done

MasterPropertyList.hasMany(PropertyViews, { foreignKey: 'master_property_id' }); // done
PropertyViews.belongsTo(MasterPropertyList, { foreignKey: 'master_property_id' }); // done

/* ------------------------------------------------------------------------------- */

/** Sold Properties Association **/ 
MasterPropertyList.hasOne(SoldProperties, { foreignKey: 'master_property_id' }); // done
SoldProperties.belongsTo(MasterPropertyList, { foreignKey: 'master_property_id' }); // done

User.hasMany(SoldProperties, { foreignKey: 'user_id' }); // done 
SoldProperties.belongsTo(User, { foreignKey: 'user_id' }); // done

/* ------------------------------------------------------------------------------- */

/** Property Amenities Association **/ 
CustomAmenities.hasOne(Amenities, { foreignKey: 'custom_amenity_id' });
Amenities.belongsTo(CustomAmenities, { foreignKey: 'custom_amenity_id' });

CustomInclusions.hasOne(Amenities, { foreignKey: 'custom_inclusion_id' });
Amenities.belongsTo(CustomInclusions, { foreignKey: 'custom_inclusion_id' });

/* ------------------------------------------------------------------------------- */


/** Property Approvals Association **/ 
// Approvals.hasOne(Approvers, { foreignKey: 'approver_id' });
// Approvers.belongsTo(Approvals, { foreignKey: 'approver_id' });

Approvals.hasOne(MasterPropertyList, { foreignKey: 'master_property_id' });
MasterPropertyList.belongsTo(Approvals, { foreignKey: 'master_property_id' });

/* ------------------------------------------------------------------------------- */

/** Property Escalations Association **/ 
Escalations.hasMany(Approvals, { foreignKey: 'approval_id' });
Approvals.belongsTo(Escalations, { foreignKey: 'approval_id' });

Escalations.hasMany(Approvers, { foreignKey: 'approver_id' });
Approvers.belongsTo(Escalations, { foreignKey: 'approver_id' });

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
    CustomInclusions,
    Escalations
}