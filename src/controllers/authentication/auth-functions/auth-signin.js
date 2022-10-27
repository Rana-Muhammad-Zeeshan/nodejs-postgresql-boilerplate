const tokenForUser = require('./auth-tokenForUser')

const authSignin = async (req, res, next) => {
  try {
    //already user just give them a token

    return res.status(200).send({ token: tokenForUser(req.user) })
  } catch (error) {
    console.log(error)
  }
}

module.exports = authSignin
