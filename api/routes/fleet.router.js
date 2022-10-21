const router = require('express').Router()
const { checkAuth, checkRole } = require('../utils')

const {
    addNewTruck,
    updateTruckById
} = require('../controllers/fleet.controller')

router.post('/', checkAuth, checkRole, addNewTruck)
router.patch('/', checkAuth, checkRole, updateTruckById)

module.exports = router