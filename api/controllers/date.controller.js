const Date = require ('../models/date.model')
const User = require('../models/user.model')

async function registerOwnDate (req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id)
        await user.createDate(req.body)
        return res.status(200).json({message: 'New appoinment registered', date: date})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
//no funciona
async function registerAdate (req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        const date = await Date.create(req.body)
        await user.addDate(date)
        const data = date[0].dataValues
        return !user ? res.status(404).send('User not found') : res.status(200).json({ 
            message: `User's date registered`,
            date: data.date})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOwnDates (req, res) {
    try {
        const date = await Date.findAll({
            where: {
                userId: res.locals.user.id
            }
        }) 
        return !date ? res.status(404).send('This user has no dating') : res.status(200).json(date)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getDateByUserId (req, res) {
    try {
        const date = await Date.findAll({
            where: {
                userId: req.params.id
            },
            include: User
        }) 
        return !date ? res.status(404).send('This user has no dating') : res.status(200).json(date)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getAllDates (req, res) {
    try {
        const dates = await Date.findAll({
            include: User
        })
        return !dates ? res.status(404).send('No dates found') : res.status(200).json(dates)
    } catch (error) {
      return res.status(500).send(error.message)
    }
}

async function updateOwnDate (req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id)
        const [,date] = await Date.update(req.body, {
            returning: true,
            where: {
            userId: res.locals.user.id
            }        
        })
        const data = date[0].dataValues
        return !date ? res.status(404).send('No date found') : res.status(200).json({
            message: 'date updated', 
            date: data.date})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
async function updateAdateByUserId (req, res) {
    try {
        const [,date] = await Date.update(req.body, {
            returning: true,
            where: {
            userId: req.params.id
            }        
        })
        const data = date[0].dataValues
        return !date ? res.status(404).send('No date found') : res.status(200).json({
            message: 'date updated', 
            date: data.date})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteOwnDate (req, res) {
    try {
        const user = await Date.findAll({
            where: {
                userId: res.locals.user.id
            }
        })
        const date = await Date.destroy({
            where: {
                id: req.parms.id
            }
        })
        return !date ? res.status(404).send('Date not found') : res.status(200).send('Date cancelled')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteAllOwnDates (req, res) {
    try {
        const date = await Date.destroy({
            where: {
            userId: res.locals.user.id
            }
        })
        return !date ? res.status(404).send('Date not found') : res.status(200).send('Date cancelled')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteAdateById (req, res) {
    try {
        const date = await Date.destroy({
            where: {
            id: req.params.id
            }
        })
        return !date ? res.status(404).send('Date not found') : res.status(200).send('Date cancelled')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteAlldatesByUserId (req, res) {
    try {
        const date = await Date.destroy({
            where: {
            userId: req.params.id
            }
        })
        return !date ? res.status(404).send('Date not found') : res.status(200).send('Date cancelled')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
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
}
