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
    } catch (error) {

    }

}

async function getProductManagement(req, res) {




    res.render('admin/product-management');
}

async function getCustomerManagement(req, res) {

    //query all users by email alphabetically
    try {
        const data = await prisma2.users.findMany({
            orderBy: {
                email: 'asc'
            }
        });
        res.render('admin/customer-management', { title: "Customer Data", data });
    } catch (error) {
        throw error;
    }
}






module.exports = {
    adminHomepage,
    isAdmin,
    getProductManagement,
    getCustomerManagement
}