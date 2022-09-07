

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const passport = require('passport');
const initializePassport = require('../passport-config');


const prisma = new PrismaClient();


function user(req, res) {
    res.render('users/user');
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
                password: hashedPassword
            },
        })
        res.redirect('/user/login')

    } catch (error) {
        res.redirect('/user/register')
    }
}

function getLogin(req, res) {
    res.render('users/login'); //render is file location.
}


function postLogin(req, res) {

}

module.exports = {
    user,
    getRegister,
    getLogin,
    postRegister,
    postLogin,
}