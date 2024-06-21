'use strict'

const Role = require('./Role');
const User = require('./User');
const Listing = require('./Listing');
const MasterPropertyList = require('./MasterPropertyList');

User.hasOne(Role, {
    foreignKey: "role_id"
});

Role.belongsTo(User, {
    foreignKey: 'role_id'
});

MasterPropertyList.hasOne(Listing, {
    foreignKey: "property_listing_id",
});

Listing.belongsTo(MasterPropertyList, {
    foreignKey: "property_id"
})

module.exports = {
    User,
    Role
}