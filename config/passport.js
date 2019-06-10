var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ 'googleId': profile.id })
        .then(user => {
            if(user) {
                return done(null, user);
            } else {
                User.create({
                    googleId: profile.id,
                    email: profile.emails[0].value
                }).then(user => {
                    return done(null, user);
                }).catch(err => {
                    return done(err);
                })
            }
        })
        .catch(err => {return done(err)})
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});