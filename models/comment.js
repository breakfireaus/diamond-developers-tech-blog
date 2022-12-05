const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class userComment extends Model {}

userComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    article_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'userArticle',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    // timestamps: true,
    underscored: true,
    modelName: 'userComment',
  }
);

module.exports = userComment;
