const { PrismaClient } = require('@prisma/client');
function adminHomepage(req, res) {
    res.render('admin/adminHomepage');

}

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





module.exports = {
    adminHomepage,
    isAdmin
}