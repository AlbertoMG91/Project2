const { DataTypes } = require ('sequelize')
const {sequelize } = require ('../../database')

const User = sequelize.define(
    'user',
    {
        role: {
            type: DataTypes.ENUM ('user', 'admin'),
            defaultValue: 'user'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    arg: true,
                    msg: 'invalid email format'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            unique: true
        },
        address: {
            type: DataTypes.INTEGER
        },
        digitalWallet: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        rankingPoints: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    { timestamps: false }
)

module.exports = User