const sgMail = require('@sendgrid/mail')
const { NotFound } = require('http-errors')

const { SENDGRID_API_KEY } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: 'djutsu17@gmail.com' }
    await sgMail.send(mail)
  } catch (error) {
    throw new NotFound(error.message)
  }
}

module.exports = sendMail
