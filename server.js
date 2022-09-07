
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const expressLayouts = require('express-ejs-layouts')
console.clear();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
//app.set('layout', 'layouts/layout')
//app.use(expressLayouts)

const userRouter = require('./routes/users');

app.use('/user', userRouter);



const port = 8081 || process.env.PORT;
app.listen(port, () => {
    console.log("Server Running");
});