const express = require('express');
const passport = require('passport');
const router = express.Router();
const database = require('../database/database');


router.get('/login', (_, res) => {
    res.render('login');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect profile.
        database.registerUser(req.user); //Call function for validate if the user exits in the database
        res.redirect('/profile');
    });

router.get('/logout', function (req, res) {
    req.logout();
    req.session = null;
    res.redirect('/animals');
});

module.exports = router;