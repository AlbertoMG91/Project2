const router = require('express').Router()
const { checkAuth, checkRole } = require('../utils')

const {
    addNewTruck,
    updateTruckById,
    removeTruckById,
    getFleet,
    getTruckById,
    updateTruckToDate,
    updateTruckToContainer
} = require('../controllers/fleet.controller')

router.post('/', checkAuth, checkRole, addNewTruck)
router.get('/', checkAuth, checkRole, getFleet)
router.get('/:id', checkAuth, checkRole, getTruckById)
router.patch('/date/:id', checkAuth, checkRole, updateTruckToDate)
router.patch('/container/:id', checkAuth, checkRole, updateTruckToContainer)
router.patch('/:id', checkAuth, checkRole, updateTruckById)
router.delete('/:id', checkAuth, checkRole, removeTruckById)

module.exports = router