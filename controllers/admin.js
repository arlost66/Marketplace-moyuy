const { PrismaClient } = require('@prisma/client');

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
    } catch (error) {

    }

}

function getProductManagement(req, res) {
    res.render('admin/product-management');
}

function getCustomerManagement(req, res) {
    res.render('admin/customer-management');
}






module.exports = {
    adminHomepage,
    isAdmin,
    getProductManagement,
    getCustomerManagement
}