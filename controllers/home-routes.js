const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/userpage', (req, res) => {
    res.render('userpage');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;