


const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('../passport-config');


initializePassport(passport,
    async email => {
        const temp = email;
        return await prisma.users.findUnique({
            where: {
                email: temp
            }
        });
    },
    async id => {
        const temp = id;
        return await prisma.users.findUnique({
            where: {
                id: temp
            }
        })
    }
);



const prisma = new PrismaClient();


function userHomepage(req, res) {
    res.render('users/homepage', { name: req.user.name });
}

function getRegister(req, res) {
    res.render('users/register');
}

async function postRegister(req, res) {

    try { //use await on processes
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const post = await prisma.users.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role
            },
        })
        res.redirect('/login')

    } catch (error) {
        res.redirect('/register')
    }
}

function getLogin(req, res) {
    res.render('users/login'); //render is file location.
}
//controller for post login is in ROUTER

/*function postLogin() {
    passport.authenticate('local', {
        successRedirect: '/users/homepage',
        failureRedirect: '/users/login',
        failureFlash: true
    })
}*/

function getShop(req, res) {
    res.render('users/shop');
}

function logout(req, res, next) {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');

    });

}



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

function checkNotAuthenticatedAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("TEST");
        return res.render('admin/adminHomepage')
    }
    next();
}

module.exports = {
    userHomepage,
    getRegister,
    getLogin,
    postRegister,
    // postLogin,
    checkAuthenticated,
    checkNotAuthenticated,
    checkNotAuthenticatedAdmin,
    getShop,
    logout,


}