const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const service = require("../../config/authenticate");

passport.use(
    new LocalStrategy(async function(username, password, done) {
        try {
            var user = null
            if (username == service.giamdoc.username) {
                user = service.giamdoc;
            }
            if (username == service.ketoan.username) {
                user = service.ketoan;
            }
            if (username == service.quankho.username) {
                user = service.quankho;
            }
            if (username == service.quanly.username) {
                user = service.quanly;
            }
            if (username == service.daily.username) {
                user = service.daily;
            }

            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
            if (!validPassword(user, password)) {

                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

const validPassword = (user, password) => {
    return password == user.password;
};

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {

    service
        .then((res) => done(null, res))
        .catch((err) => done(err));
});

module.exports = passport;