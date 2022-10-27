const pool = require('../../../pool')
const toCamelCase = require('../../../utilities/to-camelCase')

const getUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM users WHERE email = $1;'
    const params = [email]
    const { rows } = await pool.query(query, params)

    if (rows.length > 0) {
      return toCamelCase(rows)[0]
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = getUserByEmail
