const jwt = require('jsonwebtoken')
const moment = require('moment')

const serverConfig = require('../../../../server-config')

const tokenForUser = (user) => {
  try {
    // const timestamp = Math.floor(Date.now() / 1000) - 30
    const timestamp = moment().unix()

    return jwt.sign({ sub: user.id, iat: timestamp }, serverConfig.jwtSecret, {
      expiresIn: '7d',
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = tokenForUser
