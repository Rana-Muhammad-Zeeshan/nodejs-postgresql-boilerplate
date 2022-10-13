require('dotenv').config()
const expressApp = require('./src/app')
const pool = require('./src/pool')
const databaseConnectionObject = require('./src/config/databaseConnectionObject')

//first connecting to the database then creating an express app
pool
  .connect(databaseConnectionObject)
  .then(() => {
    expressApp().listen(3005, () => {
      console.log('listening on port 3005')
    })
  })
  .catch((error) => {
    console.error(error)
  })
