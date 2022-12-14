const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const currentUserData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = currentUserData.id;
      req.session.logged_in = true;

      res.status(200).json(currentUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/signin', async (req, res) => {
  try {
    const currentUserData = await User.findOne({ 
      where: { 
        username: req.body.username, 
      } 
    });

    if (!currentUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await currentUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = currentUserData.id;
      req.session.logged_in = true;
      
      res.json({ user: currentUserData, message: 'Success! You are now logged in!' });
    });

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/signout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;