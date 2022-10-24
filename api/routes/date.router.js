const router = require('express').Router()
const { checkAuth, checkRole } = require('../utils')

const {
    registerOwnDate,
    registerAdate,
    getOwnDates,
    getDateByUserId,
    getAllDates,
    updateOwnDate,
    updateAdateByUserId,
    deleteOwnDate,
    deleteAdateById,
    deleteAllOwnDates,
    deleteAlldatesByUserId
} = require('../controllers/date.controller')

router.post('/profile', checkAuth, registerOwnDate)
router.post('/profile/:id', checkAuth, checkRole, registerAdate)
router.get('/', checkAuth, checkRole, getAllDates)
router.get('/profile', checkAuth, getOwnDates)
router.get('/profile/:id', checkAuth, checkRole, getDateByUserId)
router.patch('/profile/:id', checkAuth, updateOwnDate)
router.patch('/:id', checkAuth, checkRole, updateAdateByUserId)
router.delete('/profile', checkAuth, deleteAllOwnDates)
router.delete('/profile/:id', checkAuth, deleteOwnDate)
router.delete('/all/:id/', checkAuth, checkRole, deleteAlldatesByUserId)
router.delete('/:id', checkAuth, checkRole, deleteAdateById)

module.exports = router