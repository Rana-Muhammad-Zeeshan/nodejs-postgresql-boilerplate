const authSignin = require('./auth-functions/auth-signin')
const authSignout = require('./auth-functions/auth-signout')
const authSignup = require('./auth-functions/auth-signup')

const authenticationController = {
  signup: authSignup,
  signin: authSignin,
  signout: authSignout,
}

module.exports = authenticationController
