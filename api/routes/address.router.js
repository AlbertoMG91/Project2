const router = require('express').Router()
const { checkAuth, checkRole } = require('../utils')

const {
    registerOwnAddress,
    updateOwnAddress,
    deleteOwnAddress,
    updateAddressByUserId,
    getAllAddresses,
    deleteAddressByUserId,
    getNearbyContainers,
    registerAnAddress
} = require('../controllers/address.controller')

router.post('/profile', checkAuth, registerOwnAddress)
router.post('/profile/:id', checkAuth, checkRole, registerAnAddress)
router.get('/', checkAuth, checkRole, getAllAddresses)
router.get('/container', checkAuth, getNearbyContainers)
router.patch('/profile', checkAuth, updateOwnAddress)
router.patch('/profile/:id', checkAuth, checkRole, updateAddressByUserId)
router.delete('/profile', checkAuth, deleteOwnAddress)
router.delete('/profile/:id', checkAuth, checkRole, deleteAddressByUserId)

module.exports = router