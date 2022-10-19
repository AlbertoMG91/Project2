const router = require('express').Router()

const usersRouter = require('./user.router')
const authRouter = require('./auth.router')

router.use('/user', usersRouter)
router.use('/auth', authRouter)

module.exports = router