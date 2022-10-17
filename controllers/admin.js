const { PrismaClient, prisma } = require('@prisma/client');
const prisma2 = new PrismaClient();

function adminHomepage(req, res) {
  res.render('admin/adminHomepage');
}

/*function getStockManagement(req, res) {
    res.render('admin/stock-management');
}*/

async function isAdmin(req, res, next) {
  try {
    const user = await req.user;

    if (user.role !== 'ADMIN') {
      return res.redirect('/');
    }
    next();
  } catch (error) { }
}
async function getCustomerManagement(req, res) {
  //query all users by email alphabetically
  try {
    const name = await req.user;
    const data = await prisma2.users.findMany({
      orderBy: {
        email: 'asc',
      },
    });
    res.render('admin/customer-management', { title: 'Customer Data', data, name: name });
  } catch (error) {
    throw error;
  }
}

async function editCustomerManagement(req, res) {
  try {
    const original = await prisma2.users.findUnique({
      where: {
        id: parseInt(req.body.id),
      },
    });
    const data = await prisma2.users.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        name: req.body.name || original.name,
        email: req.body.email || original.email,
      },
    });
    res.redirect('/admin/customer-management');
  } catch (error) {
    throw error;
  }
}

async function getProductManagement(req, res) {
  try {
    const name = await req.user
    const data = await prisma2.products.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    res.render('admin/product-management', { title: 'Product Data', data, name: name });
  } catch (error) {
    throw error;
  }
}

async function addProductManagement(req, res) {
  //console.log(req.file);
  try {
    const data = await prisma2.products.create({
      data: {
        name: req.body.name,
        type: req.body.type,
        cost: parseFloat(req.body.cost),
        description: req.body.description,
        stock: parseInt(req.body.stock),
        photoUrl: req.file.path
      },
    });
    res.redirect('/admin/product-management');
  } catch (error) {
    throw error;
  }
}

async function editProductManagement(req, res) {
  try {
    const original = await prisma2.products.findUnique({
      where: {
        id: parseInt(req.body.id),
      },
    });
    const data = await prisma2.products.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        name: req.body.name || original.name,
        type: req.body.type || original.type,
        cost: parseFloat(req.body.cost) || original.cost,
        description: req.body.description || original.description,
        stock: parseInt(req.body.stock) || original.parseInt,
        photoUrl: req.file.path
      },
    });
    res.redirect('/admin/product-management');
  } catch (error) {
    throw error;
  }
}

async function deleteProductManagement(req, res) {
  try {
    const data = await prisma2.products.delete({
      where: {
        id: parseInt(req.body.id),
      },
    });
    res.redirect('/admin/product-management');
  } catch (error) {
    throw error;
  }
}

module.exports = {
  adminHomepage,
  isAdmin,
  getCustomerManagement,
  editCustomerManagement,

  getProductManagement,
  addProductManagement,
  editProductManagement,
  deleteProductManagement,
};
