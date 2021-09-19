const current = require('./current')
const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const updateAvatar = require('./updateAvatar')
const verifyEmail = require('./verifyEmail')
const sendAgainToVerify = require('./sendAgainToVerify')

module.exports = {
  current,
  login,
  logout,
  register,
  updateAvatar,
  verifyEmail,
  sendAgainToVerify,
}
