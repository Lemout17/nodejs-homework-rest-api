const { Contact } = require('../../models')

const updateContact = async (req, res) => {
  const { contactId } = req.params

  const contacts = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })

  if (!contacts) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ contacts })
}

module.exports = updateContact
