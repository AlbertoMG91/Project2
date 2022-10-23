const { DataTypes } = require ('sequelize')
const {sequelize } = require ('../../database')

const Address = sequelize.define(
    'address',
    {
        street: {
            type: DataTypes.STRING,
        },
        number: {
            type: DataTypes.INTEGER
        },
        flat: {
            type: DataTypes.STRING
        },
        postalCode: {
            type: DataTypes.INTEGER
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false }
)

module.exports = Address