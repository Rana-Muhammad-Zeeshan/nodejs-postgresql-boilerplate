// creating a new express application
// app stuff goes here such as middleware, routing etc
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')

const authRouter = require('./routes/auth-routes')
const passportService = require('./services/passport')

const requireAuth = passport.authenticate('jwt', { session: false })

const expressApp = () => {
  const app = express()

  //middlewares
  // app.use(passportService.initialize())
  app.use(morgan('combined'))
  app.use(bodyParser.json({ type: '*/*' }))

  app.get('/', requireAuth, (req, res) => {
    return res.send(req.user)
  })

  //routes
  app.use('/auth', authRouter)

  return app
}

module.exports = expressApp
