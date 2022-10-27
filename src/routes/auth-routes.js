const express = require('express')
const passport = require('passport')

const authenticationController = require('../controllers/authentication/authentication')

const authRouter = express.Router()

const requireSignIn = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })

authRouter.post('/signup', authenticationController.signup)

authRouter.post('/signin', requireSignIn, authenticationController.signin)

authRouter.delete('/signout', requireAuth, authenticationController.signout)

module.exports = authRouter
