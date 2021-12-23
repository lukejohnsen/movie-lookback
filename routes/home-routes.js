const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Entry } = require('../models');

router.get('/userpage', (req, res) => {
    res.render('userpage');
});

module.exports = router;