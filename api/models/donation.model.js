const { DataTypes } = require ('sequelize')
const {sequelize } = require ('../../database')

const Donation = sequelize.define(
    'donation',
    {
        type: {
            type: DataTypes.ENUM ('coin', 'clothes'),
            defaultValue: 'coin',
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coins: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        points: {
            type: DataTypes.INTEGER
        }
    },
    { timestamps: false }
)

module.exports = Donation