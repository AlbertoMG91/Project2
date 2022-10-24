const Address = require ('../models/address.model')
const Container = require ('../models/container.model')
const User = require ('../models/user.model')

async function registerOwnAddress (req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id)
        const address = await user.createAddress(req.body)
        return res.status(200).json({message: 'New address registered', address: address})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function registerAnAddress (req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        const address = await Address.create(req.body)
        await user.setAddress(address)
        return !user ? res.status(404).send('User not found') : res.status(200).json({message: `User's address registered`, address})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateOwnAddress (req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id)
        const [,address] = await Address.update(req.body, {
            returning: true,
            where: {
            userId: res.locals.user.id
            }        
        })
        const data = address[0].dataValues
        return !address ? res.status(404).send('No address found') : res.status(200).json({
            message: 'Address updated', 
            street: data.street,
            number: data.number,
            flat: data.flat,
            postalCode: data.postalCode,
            city: data.city})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function deleteOwnAddress (req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id)
        const address = await Address.destroy({
            where: {
            userId: res.locals.user.id
            }
        })
        return res.status(200).send({message: 'Address deleted'})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateAddressByUserId (req, res) {
    try {
        const [,address] = await Address.update(req.body, {
            returning: true,
            where: {
            userId: req.params.id
            }        
        })
        const data = address[0].dataValues
        return !address ? res.status(404).send('No address found') : res.status(200).json({
            message: 'Address updated', 
            street: data.street,
            number: data.number,
            flat: data.flat,
            postalCode: data.postalCode,
            city: data.city})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getAllAddresses (req, res) {
    try {
        const addresses = await Address.findAll()
        return !addresses ? res.status(404).send('No addresses found') : res.status(200).json(addresses)
    } catch (error) {
      return res.status(500).send(error.message)
    }
}

async function deleteAddressByUserId (req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id)
        const address = await Address.destroy({
            where: {
            userId: req.params.id
            }
        })
        return res.status(200).send({message: `User's address deleted`})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getNearbyContainers(req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id)
        const address = await Address.findOne({
            where: {
                userId: user.id
            }
        })
        const container = await Container.findAll({
            where: {
                city: address.city
            }
        })
        return res.status(200).json({container})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    registerOwnAddress,
    updateOwnAddress,
    deleteOwnAddress,
    updateAddressByUserId,
    getAllAddresses,
    deleteAddressByUserId,
    getNearbyContainers,
    registerAnAddress
}