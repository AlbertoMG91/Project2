const User = require ('../models/user.model')
const Address = require ('../models/address.model')

async function getOwnProfile (req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id, {
            include: Address,
            attributes: {
                exclude: ['id', 'password', 'role',]
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
        const data = user[0].dataValues
        return !user ? res.status(404).send('No user found') : res.status(200).json({ 
        message: 'User updated', 
        name: data.name, 
        email: data.email, 
        phone: data.phone, 
        address: data.address, 
        digitalWallet: data.digitalWallet, 
        rankingPoints: data.rankingPoints})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateUserById (req, res) {
    try {
        const [,user] = await User.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            }
        })
        const data = user[0].dataValues
        return !user ? res.status(404).send('User not found') : res.status(200).json({ 
            message: 'User updated',
            id: data.id, 
            role: data.role,
            name: data.name, 
            email: data.email, 
            phone: data.phone, 
            address: data.address, 
            digitalWallet: data.digitalWallet, 
            rankingPoints: data.rankingPoints})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getAllUsers (req, res) {
    try {
        const users = await User.findAll({
            include: Address,
            attributes: { exclude: ['password']
        }})
        return !users ? res.status(404).send('No users found') : res.status(200).json(users)
    } catch (error) {
      return res.status(500).send(error.message)
    }
}
  
async function getUserById (req, res) {
    try {
        const user = await User.findByPk(req.params.id, {
            include: Address,
            attributes: {
                exclude: ['password']
            }
        })
        return !user ? res.status(404).send('User not found') : res.status(200).json(user)
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

async function deleteOwnProfile (req, res) {
    try {
        const user = await User.destroy({
            where: {
            id: res.locals.user.id
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
    updateUserById,
    getAllUsers,
    getUserById,
    deleteOwnProfile,
    deleteUserById
}