const router = require('express').Router()
const { checkAuth, checkRole } = require('../utils')

const {
  getOwnProfile,
  updateOwnProfile,
  updateUserById,
  getAllUsers,
  getUserById,
  deleteOwnProfile,
  deleteUserById
} = require('../controllers/user.controller')

router.get('/profile', checkAuth, getOwnProfile)
router.get('/', checkAuth, checkRole, getAllUsers)
router.get('/:id', checkAuth, checkRole, getUserById)
router.patch('/profile', checkAuth, updateOwnProfile)
router.patch('/:id', checkAuth, checkRole, updateUserById)
router.delete('/profile', checkAuth, deleteOwnProfile)
router.delete('/:id', checkAuth, checkRole, deleteUserById)

module.exports = router