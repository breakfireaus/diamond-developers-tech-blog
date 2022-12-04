const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//all comments route
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'user_content',
            'user_id',
            'article_id',
            'created_at'
        ],
        order: [['created_at', 'DESC']]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create comment
router.post('/', withAuth, (req, res) => {
    console.log(req.session);
    if (req.session.loggedIn) {
        Comment.create({
            user_content: req.body.user_content,
            article_id: req.body.article_id,
            user_id: req.session.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// delete comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({ 
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: 'A post was not found with this ID .' })
                return;
            };

            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
