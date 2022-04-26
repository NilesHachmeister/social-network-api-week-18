const router = require('express').Router();
const apiRoutes = require('./api');

// using the api route
router.use('/api', apiRoutes);

// if the route is not the api route the user is told to try again
router.use((req, res) => {
    return res.send('Incorrect route, please try again.');
});

module.exports = router;