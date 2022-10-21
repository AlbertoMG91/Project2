const router = require('express').Router()

const userRouter = require('./user.router')
const authRouter = require('./auth.router')
const containerRouter = require('./container.router')
const fleetRouter = require('./fleet.router')
const addressRouter = require('./address.router')
const dateRouter = require('./date.router')
const donationRouter = require('./donation.router')

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/container', containerRouter)
router.use('/fleet', fleetRouter)
router.use('/address', addressRouter)
router.use('/date', dateRouter)
router.use('/donation', donationRouter)

module.exports = router