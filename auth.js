const passport = require('passport')
const BearerStrategy = require('passport-http-bearer')

//const passport = require('passport')
//start new session stuff
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('./users/model')

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
        done(err, user)
    })
})

//passport.use('local-signup', new LocalStrategy({
//    usernameField: 'email',
//    passwordField: 'password',
//    passReqToCallback: true
//},
//function(req, email, password, done) {
//    process.nextTick(function() {
//        UserModel.findOne({'local.email': email}, function(err,user) {
//            if(err)
//                return done(err)
//            if(user) {
//                return done(null, false)
//            } else {
//                var newUser = newUser()
//                newUser.local.email = email
//                newUser.local.password = newUser.generateHash(password)
//                newUser.save(function(err) {
//                    if(err)
//                        throw err
//                        return done(null, newUser)
//                })
//            }
//        })
//    })
//}))

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
function(req, email, password, done) {
    console.log('*** in passport.use')
    //process.nextTick(function() {
        UserModel.findOne({'email': email}, function(err,user) {
            console.log('*** in User.findOne callback')
            if(err) {
                console.log('*** err', err)
                return done(err)
            }
            if(!user) {
                console.log('*** no username')
                return done(null, false)
            }
            if (user.password != password) {
                console.log('*** bad password')
                return done(null, false)
            }
            console.log('*** found?')
            return done(null, user)
                //var newUser = newUser()
                //newUser.local.email = email
                //newUser.local.password = newUser.generateHash(password)
                //newUser.save(function(err) {
                //    if(err)
                //        throw err
                //        return done(null, newUser)
            })
}))



//end new session stuff

passport.use(new BearerStrategy(
    function(accessToken, done) {
        UserModel.findOne({ accessToken })
            .then((user)=>{
                if(user){
                    return done(null, user)
                }else{
                    return done(null, false)
                }
            })
            .catch((err)=>{
                done(err)
            })
    }
  ))

  module.exports = passport