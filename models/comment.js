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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    article_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'userComment',
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