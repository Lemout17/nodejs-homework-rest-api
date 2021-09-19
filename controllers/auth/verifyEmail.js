const { NotFound } = require('http-errors')
const { User } = require('../../models')

const verifyEmail = async (req, res) => {
  const { verifyToken } = req.params
  console.log(verifyToken)
  const user = await User.findOne({ verifyToken })
  console.log(user)

  if (!user) {
    throw new NotFound('User not found')
  }

  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true })
  res.send('<h2>Email verified!</h2>')
}

module.exports = verifyEmail
