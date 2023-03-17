const LocalStrategy =  require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../../src/api/users/users.model');
const {validEmail,validPassword } = require('../helpers/validators');


const saltRounds = 10;

const registerStrategy = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            const existingUser = await User.findOne({email: email.toLowerCase()});
            console.log(existingUser);
            if (existingUser) {
                const error = new Error('User already exists');
                return done(error, null);
            }

            if (!validEmail(email)) {
                const error = new Error('E-mail not valid');
                return done(error, null);
            }

            if (!validPassword(password)) {
                const error = new Error('Password not valid');
                return done(error, null);
            }

            const encryptedPassword = await bcrypt.hash(password,saltRounds);

            const user = new User({
                ...req.body,
                email: email,
                password: encryptedPassword
            });
            
            const userDB = await user.save();
            userDB.password = "lol XD";
            return done(null, userDB);
        } catch (error) {
            return done(error.message);
        }
    }
)


module.exports = registerStrategy;