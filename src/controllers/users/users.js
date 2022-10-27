const getUserByEmail = require('./users-functions/get-userByEmail')
const getUserById = require('./users-functions/get-userById')

const usersController = {
  getUserByEmail,
  getUserById,
}

module.exports = usersController
