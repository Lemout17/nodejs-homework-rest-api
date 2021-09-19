const gravatar = require('gravatar')
const { Conflict } = require('http-errors')
const { User } = require('../../models')
const { sendMail } = require('../../utils')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }

  const defaultImage = gravatar.url(email, { s: '250' }, true)
  const newUser = new User({
    email,
    avatarURL: defaultImage,
  })
  newUser.setPassword(password)
  newUser.createVerifyToken()

  const { verifyToken } = newUser
  const data = {
    to: email,
    subject: 'Registration successful',
    html: `<a href="http:localhost:3000/api/users/verify/${verifyToken}">Confirm registration!</a>`,
  }

  await sendMail(data)

  await newUser.save()

  res.status(201).json({
    newUser,
  })
}

module.exports = signup
