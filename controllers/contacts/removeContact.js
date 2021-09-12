const { Contact } = require('../../models')

const removeContact = async (req, res) => {
  const { contactId } = req.params

  const contacts = await Contact.findByIdAndDelete(contactId)

  if (!contacts) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ message: 'contact deleted' })
}

module.exports = removeContact