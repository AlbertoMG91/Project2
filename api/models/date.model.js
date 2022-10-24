const { DataTypes } = require ('sequelize')
const {sequelize } = require ('../../database')

const Date = sequelize.define(
    'date',
    {
        date: {
            type: DataTypes.DATE,
        }
    }
)

module.exports = Date