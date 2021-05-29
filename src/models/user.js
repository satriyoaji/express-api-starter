const { DataTypes } = require("sequelize")
const sequelize = require("../database")
const Post = require('./post')

const User = sequelize.define("User", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'User must have a name' },
            notEmpty: { msg: 'Name must not be empty' },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'User must have a email' },
            notEmpty: { msg: 'email must not be empty' },
            isEmail: { msg: 'Must be a valid email address' },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'User must have a password' },
            notEmpty: { msg: 'password must not be empty' },
        },
    },
}, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
});

User.hasMany(Post, { foreignKey: 'userId', as: 'posts' })

module.exports = User