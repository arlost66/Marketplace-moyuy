const express = require('express');
const router = express.Router();

const {
    user,
    getRegister,
    getLogin,
    postRegister,
    postLogin,
} = require('../controllers/users.js');


router.route('/').get(user); //.route is  used for chaining

router.route('/register').get(getRegister).post(postRegister);

router.route('/login').get(getLogin).post(postLogin);

module.exports = router