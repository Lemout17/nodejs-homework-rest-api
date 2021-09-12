const { Contact } = require('../../models')

const addContact = async (req, res) => {
  const contacts = await Contact.create({ ...req.body, owner: req.user._id })

  res.status(201).json({ contacts })
}

module.exports = addContact
