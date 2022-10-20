const User = require('../api/models/user.model')
const Address = require('../api/models/address.model')
const Container = require('../api/models/container.model')
const Date = require('../api/models/date.model')
const Donation = require('../api/models/donation.model')
const Fleet = require('../api/models/fleet.model')

function addRelationsToModels() {
  try {
    User.hasMany(Donation)
    Donation.belongsTo(User)
    User.belongsToMany(Container, { through: 'user_container'})
    Container.belongsToMany(User, { through: 'user_container'})
    User.hasMany(Date)
    Date.belongsTo(User)
    Fleet.hasMany(Date)
    Date.belongsTo(Fleet)
    Fleet.hasMany(Container)
    Container.belongsTo(Fleet)
    User.hasOne(Address)
    Address.belongsTo(User)

    console.log('Relations added to all models')
  } catch (error) {
    throw error
  }
}

module.exports = addRelationsToModels