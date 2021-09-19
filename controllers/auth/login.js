const jwt = require('jsonwebtoken')
const { Unauthorized, BadRequest } = require('http-errors')

const { User } = require('../../models/user')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new Unauthorized('Email or password is wrong')
  }

  if (!user.verify) {
    throw new BadRequest('email is not verified')
  }

  const compareResult = user.comparePassword(password)

  if (!compareResult) {
    throw new Unauthorized('Email or password is wrong')
  }

  const payload = {
    id: user._id,
  }

  const { SECRET_KEY } = process.env

  const token = jwt.sign(payload, SECRET_KEY)
  const loggedUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    {
      new: true,
    }
  )
  res.json({
    token,
    loggedUser,
  })
}

module.exports = login
