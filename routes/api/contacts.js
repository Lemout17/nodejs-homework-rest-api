const router = require('express').Router()

const { contacts: ctrl } = require('../../controllers')
const { contactJoiSchema } = require('../../models/contact')
const {
  validation,
  tryCatchWrapper,
  authenticate,
} = require('../../middlewares')

const validationContactMiddleware = validation(contactJoiSchema)

router.get(
  '/',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.listContacts)
)

router.get(
  '/:contactId',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.getContactById)
)

router.post(
  '/',
  tryCatchWrapper(authenticate),
  validationContactMiddleware,
  tryCatchWrapper(ctrl.addContact)
)

router.delete(
  '/:contactId',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.removeContact)
)

router.put(
  '/:contactId',
  tryCatchWrapper(authenticate),
  validationContactMiddleware,
  tryCatchWrapper(ctrl.updateContact)
)

router.patch(
  '/:contactId/favorite',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.updateStatusContact)
)

module.exports = router
