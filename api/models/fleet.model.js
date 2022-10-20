const { DataTypes } = require ('sequelize')
const {sequelize } = require ('../../database')

const Fleet = sequelize.define(
    'fleet',
    {
        workArea: {
            type: DataTypes.STRING
        },
        contact: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.ENUM ('waiting', 'on route', 'out of service'),
            defaultValue: 'waiting'
        }
    },
    { timestamps: false }
)

module.exports = Fleet