const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;


function initialize(passport, getUserByEmail) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No user with that email' });
        }

        try {//Error with await bcrypt. added async  on container function
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            return done(e)

        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }), authenticateUser)//what is our username called

    passport.serializeUser((user, done) => { })
    passport.serializeUser((id, done) => { })

}

module.exports = initialize