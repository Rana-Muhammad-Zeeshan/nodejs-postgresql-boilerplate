// creating a new express application
// app stuff goes here such as middleware, routing etc
const express = require('express')

const expressApp = () => {
  const app = express()

  app.use(express.json())

  return app
}

module.exports = expressApp
