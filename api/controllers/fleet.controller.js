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

async function removeTruckById(req, res) {
    try {
        const truck = await Fleet.destroy({
            where: {
            id: req.params.id
            }
        })
        return !truck ? res.status(404).send('Truck not found') : res.status(200).send('Truck removed')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getFleet (req, res) {
    try {
        const fleet = await Fleet.findAll()
        return !fleet ? res.status(404).send('Fleet not found') : res.status(200).json(fleet)
    } catch (error) {
      return res.status(500).send(error.message)
    }
}
  
async function getTruckById (req, res) {
    try {
        const truck = await Fleet.findByPk(req.params.id)
        return !truck ? res.status(404).send('Track not found') : res.status(200).json({truck})
    } catch (error) {
      return res.status(500).send(error.message)
    }
}


module.exports = {
    addNewTruck,
    updateTruckById,
    removeTruckById,
    getFleet,
    getTruckById
}