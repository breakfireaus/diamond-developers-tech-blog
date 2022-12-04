const User = require('./user');
const Article = require('./article');
const Comment = require('./comment');

User.hasMany(Article, {
  foreignKey: 'user_id',
});

Article.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Article, {
  foreignKey: 'article_id',
});

Article.hasMany(Comment, {
  foreignKey: 'article_id',
});

module.exports = { User, Article, Comment};