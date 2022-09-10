const express = require('express');
const router = express.Router();
const passport = require('passport');



const {
    userHomepage,
    getRegister,
    getLogin,
    postRegister,
    postLogin,
    checkAuthenticated,
    checkNotAuthenticated,
    logout
} = require('../controllers/users.js');


router.route('/')
    .get(checkAuthenticated, userHomepage); //.route is  used for chaining

router.route('/register')
    .get(checkNotAuthenticated, getRegister)
    .post(checkNotAuthenticated, postRegister);

router.route('/login')
    .get(checkNotAuthenticated, getLogin)

    .post(checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

router.route('/logout')
    .delete(logout);


module.exports = router