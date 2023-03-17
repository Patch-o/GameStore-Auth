const passport = require('passport');
const registerStrategy = require('./register');
const loginStrategy = require('./login');

const User = require('../../src/api/users/users.model');

passport.serializeUser((user,done) => {//Saving user info in DB
    return done(null,user._id);
});
passport.deserializeUser(async( userId,done) => {
    try {
        const existingUSer = await User.findById(userId);
        return done(null, existingUSer);
    } catch (error) {
        return done(error);
    }
});


passport.use('signin', registerStrategy);
passport.use('login', loginStrategy);