const router = require('express').Router();
const routesForApi = require('./api');
const routesForHomepage = require('./homeRoutes');
const routesForDashboard = require('./dashboardRoutes');

router.use('/', routesForHomepage);
router.use('/api', routesForApi);
router.use('/dashboard', routesForDashboard);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;