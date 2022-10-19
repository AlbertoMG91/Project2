const User = require('../api/models/user.model')
const Address = require('../api/models/address.model')
const Container = require('../api/models/container.model')
const Date = require('../api/models/date.model')
const Donation = require('../api/models/donation.model')
const Fleet = require('../api/models/fleet.model')

function addRelationsToModels() {
  try {
    
    console.log('Relations added to all models')
  } catch (error) {
    throw error
  }
}

module.exports = addRelationsToModels