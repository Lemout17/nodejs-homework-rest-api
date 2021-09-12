const { Contact } = require('../../models')

const listContacts = async (req, res) => {
  const contacts = await Contact.find({ owner: req.user._id }).populate(
    'owner',
    '_id email subscription'
  )

  res.json({ contacts })
}

module.exports = listContacts
