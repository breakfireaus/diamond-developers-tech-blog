const router = require('express').Router();
const { Comment, Article, User} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const userCommentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Article,
          attributes: ['username'],
        },
      ],
      where: {
          article_id: req.params.id,
        },
      order: [['created_at', 'ASC']],
    });

    const comments = userCommentData.map((comment) => comment.get({ plain: true }));

    res.render('comments', { 
      comments, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const userCommentData = await Comment.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!userCommentData) {
      res.status(404).json({ message: 'A comment has not been found with this particular id!' });
      return;
    }
    res.status(200).json(userCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newUserComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newUserComment);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const userCommentData = await Comment.update(
    {
      content: req.body.commentContent,
    },
    {
      where: {
        id: req.params.id,
      },
    });

    if (!userCommentData) {
      res.status(404).json({ message: 'A comment has not been found with this particular id!' });
      return;
    }

    res.status(200).json(userCommentData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const UserCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!UserCommentData) {
      res.status(404).json({ message: 'A comment has not been found with this particular id!' });
      return;
    }

    res.status(200).json(UserCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;