const User = require ('../models/user.model')

async function getOwnProfile (req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id, {
            attributes: {
                exclude: ['id', 'password', 'role']
            }
        }) 
        return !user ? res.status(404).send('No user found') : res.status(200).json(user)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateOwnProfile (req, res) {
    try {
        const [,user] = await User.update(req.body, {
            returning: true,
            where: {
                id: res.locals.user.id
            }
        })
        return !user ? res.status(404).send('No user found') : res.status(200).json({user})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getAllUsers (req, res) {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password']
        }})
        return !users ? res.status(404).send('No users found') : res.status(200).json(users)
    } catch (error) {
      return res.status(500).send(error.message)
    }
}
  
async function getUserById (req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        return !user ? res.status(404).send('User not found') : res.status(200).json(user)
    } catch (error) {
      return res.status(500).send(error.message)
    }
}
  
  async function updateUserById (req, res) {
    try {
        const [userExist, user] = await User.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (userExist !== 0) {
              return res.status(200).json({ message: 'User updated', user: user })
        } else {
              return res.status(404).send('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
      }
}
  
async function deleteUserById (req, res) {
    try {
        const user = await User.destroy({
            where: {
            id: req.params.id
            }
        })
        return !user ? res.status(404).send('User not found') : res.status(200).send('User deleted')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
  
module.exports = {
    getOwnProfile,
    updateOwnProfile,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}