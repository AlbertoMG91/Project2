const router = require('express').Router()
const { checkAuth, checkRole } = require('../utils')

const {
  addNewContainer,
  updateContainerById,
  getContainerById,
  getAllContainers
} = require('../controllers/container.controller')


router.post('/', checkAuth, checkRole, addNewContainer)
router.get('/', checkAuth, checkRole, getAllContainers)
router.get('/:id', checkAuth, checkRole, getContainerById)
router.patch('/:id', checkAuth, checkRole, updateContainerById)

module.exports = router