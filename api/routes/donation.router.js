const router = require('express').Router()
const { checkAuth, checkRole } = require('../utils')

const {
    donateCoins,
    donateCoinsByUserId,
    claimCoins,
    getOwnDonations,
    getAllDonations,
    getAllDonationsByUserId,
    getDonationById,
    updateDonationById,
    deleteDonationById,
    donateClothes,
    getRanking
} = require('../controllers/donation.controller')


router.post('/coins', checkAuth, donateCoins)
router.post('/:id', checkAuth, donateClothes)
router.post('/coins/:id', checkAuth, checkRole, donateCoinsByUserId)
router.get('/coins', checkAuth, getOwnDonations)
router.get('/', checkAuth, checkRole, getAllDonations)
router.get('/ranking', checkAuth, getRanking)
router.get('/coins/:id', checkAuth, checkRole, getAllDonationsByUserId)
router.get('/:id', checkAuth, getDonationById)
router.patch('/:id',checkAuth, checkRole, updateDonationById)
router.patch('/coins',checkAuth, claimCoins)
router.delete('/:id',checkAuth, checkRole, deleteDonationById)


module.exports = router