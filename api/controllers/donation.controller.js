const Donation = require('../models/donation.model')
const User = require('../models/user.model')


async function walletUpdate (user, donation) {
    const coins = user.digitalWallet - donation.quantity 
    const [,wallet] = await User.update({digitalWallet: coins},{
        returning: true,
        where: {
            id: user.id
        }
    })
    return wallet[0].dataValues.digitalWallet
}
function pointsUpdate (user, donation) {
    const points = user.rankingPoints + donation.quantity
    const rankingP = User.update({rankingPoints: points}, {
        where: {
            id: user.id
        }
    })
    donation.points = donation.quantity
}

function digitalWalletUpdate (user, donation) {
    const points = user.digitalWallet + donation.quantity
    const rankingP = User.update({digitalWallet: points}, {
        where: {
            id: user.id
        }
    })
    donation.points = donation.quantity
}

async function donateCoins (req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id)
        const donate = await user.createDonation(req.body, {
            fields: ['quantity']
        })
        const donation = await Donation.findOne({
            where: {
                id: donate.id
            },
            attributes: {
                exclude: ['coins']
            }
        })
        walletUpdate(user, donation)
        pointsUpdate(user, donation)
        return !user ? res.status(404).send('User not found') : res.status(200).json({message: 'New donation registered', donation})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function donateCoinsByUserId (req, res) {
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
        walletUpdate(user, donation)
        pointsUpdate(user, donation)
        return !user ? res.status(404).send('User not found') : res.status(200).json({message: 'New donation registered', donation})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function claimCoins (req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id)
        const donate = await user.createDonation(req.body, {
            fields: ['quantity']
        })
        const donation = await Donation.findOne({
            where: {
                id: donate.id
            },
            attributes: {
                exclude: ['coins']
            }
        })
        const coins = await walletUpdate(user, donation)
        return !user ? res.status(404).send('User not found') : res.status(200).json({message: `Coins claimed`, coins: coins})
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

async function updateDonationById (req, res) {
    try {
        const [exist, donation] = await Donation.update(req.body, {
            returning: true,
            where: {
                id: req.params.id
            }
        })
        return !exist ? res.status(404).send('No donation found') : res.status(200).json(donation)
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

async function donateClothes (req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        const donation = await user.createDonation(req.body, {
            where: {
                userId: user.id
            }
        })
        pointsUpdate(user, donation)
        digitalWalletUpdate (user, donation)
        return !user ? res.status(404).send('User not found') : res.status(200).json({message: 'New donation registered', donation})
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