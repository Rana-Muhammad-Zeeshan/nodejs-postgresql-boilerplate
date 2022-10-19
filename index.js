require('dotenv').config()
const expressApp = require('./src/app')
const pool = require('./src/pool')
const databaseConnectionObject = require('./src/config/databaseConnectionObject')

//first connecting to the database then creating an express app
pool
  .connect(databaseConnectionObject)
  .then(() => {
    const serverPort = process.env.SERVER_PORT || 3090
    expressApp().listen(serverPort, () => {
      console.log(`listening on port ${serverPort}`)
    })
  })
  .catch((error) => {
    console.error(error)
  })
