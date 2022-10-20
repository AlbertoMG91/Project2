const { DataTypes } = require ('sequelize')
const {sequelize } = require ('../../database')

const Date = sequelize.define(
    'date',
    {
        date: {
            type: DataTypes.DATE,
        },
        address: {
            type: DataTypes.STRING
        }
    },
    { timestamps: false }
)

module.exports = Date