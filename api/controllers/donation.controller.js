const Donation = require('../models/donation.model')
const User = require('../models/user.model')

async function donateCoins (req, res) { //descontar de la wallet  // Añadir puntos al donar
    try {
        const user = await User.findByPk(res.locals.user.id)
        const donate = await user.createDonation(req.body, {
            fields: ['quantity']
        })
        const donation = await Donation.findOne({
            attributes: {
                exclude: ['coins']
            }
        }) 
        // const wallet = await User.findByPk(res.locals.user.digitalWallet)
        // wallet -= donation.quantity
        return !user ? res.status(404).send('User not found') : res.status(200).json({message: 'New donation registered', donate}) //No cambia la donacion en Postman.
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function donateCoinsByUserId (req, res) {  //descontar de la wallet // Añadir puntos al donar
    try {
        const user = await User.findByPk(req.params.id)
        const donate = await user.createDonation(req.body, {
            fields: ['quantity']
        })
        const donation = await Donation.findOne({
            attributes: {
                exclude: ['coins']
            }
        })
        return !user ? res.status(404).send('User not found') : res.status(200).json({message: 'New donation registered', donate})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function claimCoins (req, res) {  //descontar de la wallet
    try {
        const user = await User.update(res.locals.user.digitalWallet,{
            fields: ['digitalWallet']
        })
        return !user ? res.status(404).send('User not found') : res.status(200).json(digitalWallet)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOwnDonations (req, res) {
    try {
        const donations = await Donation.findAll({
            where: {
                userId: res.locals.user.id
            }
        })
        return !donations ? res.status(404).send('No donation found') : res.status(200).json(donations)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getAllDonations (req, res) {
    try {
        const donations = await Donation.findAll()
        return !donations ? res.status(404).send('No donation found') : res.status(200).json(donations)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getAllDonationsByUserId (req, res) {
    try {
        const donations = await Donation.findAll({
            where: {
                userId: req.params.id
            }
        })
        return !donations ? res.status(404).send('No donation found') : res.status(200).json(donations)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getDonationById (req, res) {
    try {
        const donations = await Donation.findOne({
            where: {
                id: req.params.id
            }
        })
        return !donations ? res.status(404).send('No donation found') : res.status(200).json(donations)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
// Arreglar el Return.
async function updateDonationById (req, res) {
    try {
        const [,donation] = await Donation.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return ![,donation] ? res.status(404).send('No donation found') : res.status(200).json([,donation])
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteDonationById (req, res) {
    try {
        const donation = await Donation.destroy({
            where: {
                id: req.params.id
            }
        })
        return !donation ? res.status(404).send('No donation found') : res.status(200).send('Donation deleted')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function donateClothes (req, res) {  // Añadir puntos al donar
    try {
        const user = await User.findByPk(req.params.id)
        const donate = await user.createDonation(req.body)
        return !user ? res.status(404).send('User not found') : res.status(200).json({message: 'New donation registered', donate})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getRanking (req, res) {
    try {
        const user = await User.findAll({
            attributes: {
                exclude: ['id','password','email','role','phone','digitalWallet']
            },
            order: [['rankingPoints', 'DESC']]
        })
        return res.status(200).json({message: 'Ranking', user})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}



module.exports = {
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
}