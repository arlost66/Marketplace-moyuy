const express = require('express');
const adminRouter = express.Router();
//const passport = require('passport');

const { adminHomepage,
    isAdmin,


    getCustomerManagement,

    getProductManagement,
    addProductManagement,
    editProductManagement,
    deleteProductManagement
} = require('../controllers/admin');

const { checkAuthenticated,
    checkNotAuthenticated
} = require('../controllers/users');


//prefix admin


adminRouter.route('/')//homepage sa admin
    .get(checkAuthenticated, isAdmin, adminHomepage);//admin Dashboard Route


adminRouter.route('/customer-management')
    .get(checkAuthenticated, isAdmin, getCustomerManagement)
//  .post(checkAuthenticated, isAdmin, addCustomerManagement)
// .put(checkAuthenticated, isAdmin, editCustomerManagement)
// .delete(checkAuthenticated, isAdmin, deleteCustomerManagement)

//product management routers
adminRouter.route('/product-management')
    .get(checkAuthenticated, isAdmin, getProductManagement)
    .post(checkAuthenticated, isAdmin, addProductManagement)
    .put(checkAuthenticated, isAdmin, editProductManagement)
    .delete(checkAuthenticated, isAdmin, deleteProductManagement)



/*adminRouter.route('/stock-management')
    .get(checkAuthenticated, isAdmin, checkNotAuthenticatedAdmin, getStockManagement)*/





module.exports = adminRouter;