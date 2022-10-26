const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(`${process.env.DIALECT}://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}`,{
	logging: false,
})

async function checkConnection() {
	try {
		await sequelize.authenticate()
		console.log('Connection to DB has been established successfully.')
	} catch (error) {
		throw error
	}
}

async function syncModels(value) {
	const state = {
		alter: { alter: true },
		force: { force: true },
	}

	try {
		await sequelize.sync(state[value] || '')
		console.log(`All models were synchronized successfully using sync(${JSON.stringify(state[value]) || ''}).`)
	} catch (error) {
		throw error
	}
}

module.exports = { sequelize, checkConnection, syncModels }