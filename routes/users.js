const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  userHomepage,
  getRegister,
  getLogin,
  postRegister,
  checkAuthenticated,
  checkNotAuthenticated,
  getShop,
  getProduct,
  getOrder,
  getCart,
  addToCart,
  getAbout,
  logout,
  deleteProductOnCart,
} = require('../controllers/users.js');

router.route('/').get(checkAuthenticated, userHomepage); // CUSTOMER AND ADMIN LANDING PAGE

router
  .route('/register') // CUSTOMER AND ADMIN REGISTER PAGE
  .get(checkNotAuthenticated, getRegister)
  .post(checkNotAuthenticated, postRegister);
router
  .route('/login') // CUSTOMER AND ADMIN LOGiN PAGE
  .get(checkNotAuthenticated, getLogin)

  .post(
    checkNotAuthenticated,
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    })
  );

router
  .route('/logout') //LOGOUT BUTTON
  .get(logout)
  .delete(logout);

router.route('/shop').get(checkAuthenticated, getShop);

router.route('/shop/:id').get(checkAuthenticated, getProduct).post(checkAuthenticated, addToCart);
router.route('/cart').get(checkAuthenticated, getCart).post(checkAuthenticated, addToCart).delete(checkAuthenticated, deleteProductOnCart);
router.route('/about-us').get(checkAuthenticated, getAbout)

module.exports = router;
