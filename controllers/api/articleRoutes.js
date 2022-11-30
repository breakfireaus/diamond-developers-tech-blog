const router = require('express').Router();
const { Article } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const userNewArticles = await Article.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(userNewArticles);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const userArticleData = await Article.update(
    {
      title: req.body.articleTitle,
      content: req.body.articleContent,
    },
    {
      where: {
        id: req.params.id,
      },
    });

    if (!userArticleData) {
      res.status(404).json({ message: 'No article found with this id.' });
      return;
    }

    res.status(200).json(userArticleData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const userArticleData = await Article.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userArticleData) {
      res.status(404).json({ message: 'No item(s) found with this id!' });
      return;
    }

    res.status(200).json(userArticleData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router; 