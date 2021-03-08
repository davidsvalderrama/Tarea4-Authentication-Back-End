const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const dataUser = req.user._json;
    res.render('profile', {dataUser, isLoggedIn: Boolean(req.user)});
});

module.exports = router;