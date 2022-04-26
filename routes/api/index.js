const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// determining which route the user is going down
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
