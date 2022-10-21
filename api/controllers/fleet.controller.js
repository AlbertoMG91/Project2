const Fleet = require ('../models/fleet.model')

async function addNewTruck(req, res) {
    try {
        const truck = await Fleet.create(req.body, 
            {
            fields: ['workArea', 'contact']
        })
        return res.status(200).json({message: 'New truck added', truck})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateTruckById(req, res) {
    try {
        const truck = await Fleet.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            }
        })
        return res.status(200).json({message: 'Truck updated', truck})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
    addNewTruck,
    updateTruckById
}