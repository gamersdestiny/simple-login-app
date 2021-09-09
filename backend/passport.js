const User = require('./schema');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;


module.exports = function(passport){
    passport.use(
        new localStrategy((userName, password, done) => {
            User.findOne({name: userName}, (err, user) => {
                if (err) throw err;
                if(!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true ){
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                })
            })
        })
    )
}
