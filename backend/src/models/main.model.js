'use strict'

const Role = require('./Role');
const User = require('./User');

User.hasOne(Role, {
    foreignKey: "role_id"
});

Role.belongsTo(User, {
    foreignKey: 'role_id'
})

module.exports = {
    User,
    Role
}