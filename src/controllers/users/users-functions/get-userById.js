const pool = require('../../../pool')
const toCamelCase = require('../../../utilities/to-camelCase')

const getUserById = async (id) => {
  try {
    const getUserByIdQuery =
      'SELECT id, email, created_at, updated_at FROM users WHERE id = $1;'
    const getUserByIdParams = [id]
    const { rows } = await pool.query(getUserByIdQuery, getUserByIdParams)

    if (rows.length > 0) {
      return toCamelCase(rows)[0]
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = getUserById
