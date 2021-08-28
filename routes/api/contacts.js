const express = require('express')
const router = express.Router()

const { JoiContactSchema } = require('../../models/contact')
const { validation } = require('../../middlewares')

const validationMiddleware = validation(JoiContactSchema)

const ctrl = require('../../controllers')

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validationMiddleware, ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', validationMiddleware, ctrl.updateContact)

router.patch('/:contactId/favorite', ctrl.updateFavorite)

module.exports = router
