const { Schema, model } = require('mongoose')
const Joi = require('joi')

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
)

const JoiUserSchema = Joi.object({
  password: Joi.string().pattern(passwordRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().required(),
  token: Joi.string().required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  JoiUserSchema,
}
