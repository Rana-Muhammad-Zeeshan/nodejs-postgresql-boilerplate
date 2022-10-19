// creating a new express application
// app stuff goes here such as middleware, routing etc
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const authRouter = require('./routes/auth-routes')

const expressApp = () => {
  const app = express()

  //middlewares
  app.use(morgan('combined'))
  app.use(bodyParser.json({ type: '*/*' }))

  //routes
  app.use('/auth', authRouter)

  return app
}

module.exports = expressApp
