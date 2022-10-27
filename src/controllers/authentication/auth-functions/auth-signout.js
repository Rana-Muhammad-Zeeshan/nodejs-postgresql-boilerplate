const authSignout = async (req, res, next) => {
  try {
    req.logOut(() => {
      return res.status(204).end()
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = authSignout
