const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const entryRoutes = require('./entry-routes');

router.use('/users', userRoutes);
router.use('/entry', entryRoutes);

module.exports = router;