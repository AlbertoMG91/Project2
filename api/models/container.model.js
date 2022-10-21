const { DataTypes } = require ('sequelize')
const { sequelize } = require ('../../database')

const Container = sequelize.define(
    'container',
    {
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false }
)

module.exports = Container