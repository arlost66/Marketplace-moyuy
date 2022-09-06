const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", 'ejs');

const port = 8080;
app.listen(port);