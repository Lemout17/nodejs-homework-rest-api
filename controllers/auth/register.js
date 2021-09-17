const gravatar = require('gravatar')

const { Conflict } = require('http-errors')

const { User } = require('../../models')

const signup = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const defaultImage = gravatar.url(email, { s: '250' }, true)

  const newUser = new User({ email, avatarUrl: defaultImage })
  newUser.setPassword(password)
  await newUser.save()

  res.status(201).json({
    newUser,
  })
}

module.exports = signup
