const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const serverConfig = require('../../server-config')
const usersController = require('../controllers/users/users')

//create local strategy
const localOptions = { usernameField: 'email' }

const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    //verify email and password, call done with user
    // if it is the correct username and password
    // otherwse call done with false

    const userByEmailResult = await usersController.getUserByEmail(email)

    if (!userByEmailResult) {
      return done(null, false)
    } else {
      bcrypt.compare(password, userByEmailResult.password, (err, isMatch) => {
        if (err) done(err)

        if (!isMatch) {
          return done(null, false)
        } else {
          return done(null, userByEmailResult)
        }
      })
      //compare passwords
    }
  }
)

//setup options for jwt
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: serverConfig.jwtSecret,
}

//create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // see if user id in payload exists in our database
  //if it does call done with user
  //otherwise call done without a user

  const userByIdResult = await usersController.getUserById(payload.sub)

  if (!userByIdResult) {
    return done(null, false)
  } else {
    return done(null, userByIdResult)
  }
})

//tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
