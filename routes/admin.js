const express = require('express');
const adminRouter = express.Router();
//const passport = require('passport');

const { adminHomepage,
    isAdmin,
    getProductManagement,
    getCustomerManagement
} = require('../controllers/admin');

const { checkAuthenticated,
    checkNotAuthenticatedAdmin } = require('../controllers/users');


//prefix admin

adminRouter.route('/')//homepage sa admin
    .get(checkAuthenticated, isAdmin, adminHomepage);//admin Dashboard Route

adminRouter.route('/customer-management')
    .get(checkAuthenticated, isAdmin, getCustomerManagement);


adminRouter.route('/product-management')
    .get(checkAuthenticated, isAdmin, getProductManagement);


/*adminRouter.route('/stock-management')
    .get(checkAuthenticated, isAdmin, checkNotAuthenticatedAdmin, getStockManagement)*/





module.exports = adminRouter;