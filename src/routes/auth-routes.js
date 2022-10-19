const express = require('express')

const authRouter = express.Router()

authRouter.get('/login', async (req, res, next) => {
  res.send(['water', 'phone', 'me'])
})

authRouter.post('/signup', async (req, res) => {})

module.exports = authRouter
