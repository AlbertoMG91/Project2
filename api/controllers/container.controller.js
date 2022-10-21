const Container = require ('../models/container.model')

async function addNewContainer (req, res) {
    try {
        const container = await Container.create( req.body,
            { 
              fields: ['city', 'street']
            })
        return res.status(200).json({ message: 'New container added', container})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getContainerById (req, res) {
    try {
        const container = await Container.findByPk( req.params.id)
        return res.status(200).json(container)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getAllContainers (req, res) {
    try {
        const containers = await Container.findAll()
        return !containers ? res.status(404).send('No containers found') : res.status(200).json(containers)
    } catch (error) {
      return res.status(500).send(error.message)
    }
}

async function updateContainerById (req, res) {
    try {
        const [,container] = await Container.update( req.body, {
            returning: true,
            where: {
                id: req.params.id,
            }
        })
        return res.status(200).json({ message: 'Container updated', container})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    addNewContainer,
    getContainerById,
    getAllContainers,
    updateContainerById
}