'use strict'

const Role = require('./Role');
const User = require('./User');
const PropertyListing = require('./PropertyListing');
const MasterPropertyList = require('./MasterPropertyList');

User.hasOne(Role, {
    foreignKey: "role_id"
});

Role.belongsTo(User, {
    foreignKey: 'role_id'
});

MasterPropertyList.hasOne(PropertyListing, {
    foreignKey: "property_listing_id",
});

PropertyListing.belongsTo(MasterPropertyList, {
    foreignKey: "property_id"
})

module.exports = {
    User,
    Role
}