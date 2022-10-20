const { DataTypes } = require ('sequelize')
const {sequelize } = require ('../../database')

const Donation = sequelize.define(
    'donation',
    {
        type: {
            type: DataTypes.ENUM ('coin', 'clothes'),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coins: {
            type: DataTypes.INTEGER
        },
        points: {
            type: DataTypes.INTEGER
        }
    },
    { timestamps: false }
)

module.exports = Donation