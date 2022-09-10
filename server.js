if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
console.clear();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

const userRouter = require('./routes/users');

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use('/', userRouter);



const port = 8081 || process.env.PORT;
app.listen(port, () => {
    console.log("Server Running");
});