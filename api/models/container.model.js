const { DataTypes } = require ('sequelize')
const {sequelize } = require ('../../database')

const Container = sequelize.define(
    'container',
    {
        address: {
            type: DataTypes.STRING,
        }
    },
    { timestamps: false }
)

module.exports = Container