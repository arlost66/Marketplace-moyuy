const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const { use } = require('passport');
const passport = require('passport');

const initializePassport = require('../passport-config');

initializePassport(
  passport,
  async (email) => {
    const temp = email;
    return await prisma.users.findUnique({
      where: {
        email: temp,
      },
    });
  },
  async (id) => {
    const temp = id;
    return await prisma.users.findUnique({
      where: {
        id: temp,
      },
    });
  }
);

const prisma = new PrismaClient();

async function userHomepage(req, res) {
  const user = await req.user;
  res.render('users/homepage', { name: user.name });
}

function getRegister(req, res) {
  res.render('users/register');
}

async function postRegister(req, res) {
  try {
    //use await on processes
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const post = await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        cart: {
          create: [
            {
              total: 00,
            },
          ],
        },
      },
    });
    res.redirect('/login');
  } catch (error) {
    new Error('Email already exists!');
    res.redirect('/register');
  }
}

function getLogin(req, res) {
  res.render('users/login'); //render is file location.
}


async function getShop(req, res) {
  try {
    const user = await req.user;
    const data = await prisma.products.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    res.render('users/shop', { data, name: user.name });
  } catch (error) {
    throw error;
  }
}
//the solo product
async function getProduct(req, res) {
  const temp = parseInt(req.params.id);

  try {
    const data = await prisma.products.findUnique({
      where: {
        id: temp,
      },
    });
    res.render('users/product', { data });
  } catch (error) {
    throw error;
  }
}

async function getCart(req, res) {
  const user = await req.user;
  try {
    const data = await prisma.carts.findMany({
      where: {
        userId: user.id,
      },
      include: {
        productsOnCart: {
          include: {
            products: true,
          },
        },
      },
    });
    res.render('users/cart', { data, name: user.name });
  } catch (error) {
    throw new Error(error);
  }
}
async function addToCart(req, res) {
  const { product, cost, quantity } = req.body;
  const user = await req.user;
  try {
    const cart = await prisma.carts.update({
      where: {
        userId: user.id,
      },
      data: {
        total: {
          increment: (parseFloat(cost) * parseInt(quantity))
        },
      },
    });
    await prisma.productsOnCart.create({
      data: {
        quantity: parseInt(quantity),
        cost: parseFloat(cost),
        carts: {
          connect: {
            id: cart.id,
          },
        },
        products: {
          connect: {
            id: parseInt(product),
          },
        },
      },
    });
    res.redirect('/shop');
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteProductOnCart(req, res) {
  const { product, cost, quantity } = req.body;
  const user = await req.user;
  try {
    const cart = await prisma.carts.update({
      where: {
        userId: user.id,
      },
      data: {
        total: {
          decrement: (parseFloat(cost) * parseInt(quantity))
        },
      },
    });

    await prisma.productsOnCart.delete({
      where: {
        id: parseInt(product),
      }
    })

    res.redirect('/cart');
  } catch (error) {
    throw new Error(error)
  }
}

async function getOrder(req, res) {
  try {
    const user = await req.user;
    const data = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
      data: {},
    });
  } catch (error) {
    throw new Error(error);
  }
}

async function getAbout(req, res) {
  try {

    const user = await req.user
    res.render('users/about-us', { name: user.name });
  } catch (error) {

  }
}

function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
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
  getShop,
  getCart,
  getProduct,
  logout,
  addToCart,
  deleteProductOnCart,
  getAbout
};
