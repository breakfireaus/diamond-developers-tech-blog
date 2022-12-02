const router = require('express').Router();
const { Article, Comment, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const DataforArticle = await Article.findAll({
      include: [
        {
          model: Comment,
          attributes: ['content'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const articles = DataforArticle.map((article) => article.get({ plain: true }));

    res.render('homepage', { 
      articles, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/signin', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signin');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

router.get('/articles/:id', async (req, res) => {
  try {
    const DataforArticle = await Article.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const articleSingle = DataforArticle.get({ plain: true });

    res.render('viewArticle', { 
      articleSingle, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// I Included this one using withAuth route here so it avoids adding the commentRoutes.js file.
router.get('/updateComment/:id', withAuth, async (req, res) => {  
  try {
    const DataForComment = await Comment.findByPk(req.params.id, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    const comment = DataForComment.get({ plain: true });

    res.render('updateComment', {
      comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;