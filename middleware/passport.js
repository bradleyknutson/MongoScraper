const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const passportJWT = require(`passport-jwt`);
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const db = require(`../models`);

passport.use(new LocalStrategy(
    {
        usernameField: `email`,
        passwordField: `password`
    },
    function(email, password, done) {
        return db.User.findOne({
            email, password
        }).then((user) => {
            if(!user) {
                return done(null, false, {
                    message: `Incorrect email or password.`
                });
            }
            return createImageBitmap(null, user, {
                message: `Logged in successfully`
            });
        }).catch(err => done(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
    },
    function(jwtPayload, callback) {
        return db.User.findById(jwtPayload.id)
            .then(user => {
                return callback(null, user);
            })
            .catch(err => {
                return callback(err);
            });
    }
));