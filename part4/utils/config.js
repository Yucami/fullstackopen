require('dotenv').config()

const PORT = process.env.PORT

const mongoUrl = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  PORT,
  mongoUrl
}