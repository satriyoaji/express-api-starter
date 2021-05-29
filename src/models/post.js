const { DataTypes } = require("sequelize")
const sequelize = require("../database")
const User = require('./user')

const Post = sequelize.define("Post", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "userId"
    }
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'posts',
  modelName: 'Post',
});

Post.associate = function (models) {
  Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
};

module.exports = Post
