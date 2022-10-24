const router = require('express').Router()
const { checkAuth, checkRole } = require('../utils')

const {
    addNewTruck,
    updateTruckById,
    removeTruckById,
    getFleet,
    getTruckById,
    assignTruckToDate
} = require('../controllers/fleet.controller')

router.post('/', checkAuth, checkRole, addNewTruck)
router.post('/:id', checkAuth, checkRole, assignTruckToDate)
router.get('/', checkAuth, checkRole, getFleet)
router.get('/:id', checkAuth, checkRole, getTruckById)
router.patch('/:id', checkAuth, checkRole, updateTruckById)
router.delete('/:id', checkAuth, checkRole, removeTruckById)

module.exports = router