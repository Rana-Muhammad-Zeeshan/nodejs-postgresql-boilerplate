const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('../../../pool')
const errorMessages = require('../../../utilities/error-messages')
const toCamelCase = require('../../../utilities/to-camelCase')
const usersController = require('../../users/users')
const tokenForUser = require('./auth-tokenForUser')

const authSignup = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(422)
        .send({ error: errorMessages.emailAndPasswordAreRequired })
    }

    // see if the user with given email exists
    try {
      const userByEmailResult = await usersController.getUserByEmail(email)

      //if a user does exists, return an error
      if (userByEmailResult) {
        return res
          .status(422)
          .send({ error: errorMessages.emailAlreadyExistsErrorMessage })
      }
    } catch (error) {
      console.log(error)
      return next(error)
    }

    //if a user with email does not exists, create and save user record
    try {
      //encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return next(err)

          const signupUserQuery =
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id,created_at,updated_at,email;'
          const signupUserParams = [email, hash]
          const { rows } = await pool.query(signupUserQuery, signupUserParams)

          if (rows.length > 0) {
            return res.status(201).send({
              success: true,
              token: tokenForUser(rows[0]),
            })
          } else {
            return res.status(422).send({ error: '' })
          }
        })
      })
    } catch (error) {
      console.log(error)
      return next(error)
    }

    // respond to request indicating the user was created
  } catch (error) {
    console.log(error)
  }
}

module.exports = authSignup
