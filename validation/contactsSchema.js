const Joi = require('joi')

const JoiContactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('^.[0-9]{3}. [0-9]{3}-[0-9]{4}$'))
    .required(),
})

module.exports = JoiContactsSchema
