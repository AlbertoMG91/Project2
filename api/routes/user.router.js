const router = require('express').Router()
const { checkAuth, checkRole } = require('../utils')

const {
  getOwnProfile,
  updateOwnProfile,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} = require('../controllers/user.controller')

router.get('/profile', checkAuth, getOwnProfile)
router.get('/', checkAuth, checkRole, getAllUsers)
router.get('/:id', checkAuth, checkRole, getUserById)
router.put('/:id', checkAuth, checkRole, updateUserById)
router.patch('/profile', checkAuth, updateOwnProfile)
router.delete('/:id', checkAuth, checkRole, deleteUserById)

module.exports = router