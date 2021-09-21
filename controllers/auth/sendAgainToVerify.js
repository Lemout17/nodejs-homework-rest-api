const { NotFound, BadRequest } = require('http-errors')
const { User } = require('../../models')
const { sendMail } = require('../../utils')

const sendAgainToVerify = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new BadRequest('Email is required')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFound('Not found')
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const data = {
    to: email,
    subject: 'Registration successful',
    html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}">Confirm registration!</a>`,
  }

  const fromEmail = 'djutsu17@gmail.com'

  await sendMail(data, fromEmail)

  res.json({ message: 'Verification email sent' })
}

module.exports = sendAgainToVerify
