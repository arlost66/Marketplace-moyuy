const express = require('express');
const adminRouter = express.Router();
const passport = require('passport');

const { adminHomepage, isAdmin } = require('../controllers/admin');

const { checkAuthenticated, checkNotAuthenticatedAdmin } = require('../controllers/users');

//prefix admin

adminRouter.route('/').get(checkAuthenticated, isAdmin, checkNotAuthenticatedAdmin, adminHomepage);//admin Dashboard Route



module.exports = adminRouter;