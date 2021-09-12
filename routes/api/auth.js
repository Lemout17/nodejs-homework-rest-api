const express = require('express')
const { userJoiSchema } = require('../../models/user')

const {
  validation,
  tryCatchWrapper,
  authenticate,
} = require('../../middlewares')

const { auth: ctrl } = require('../../controllers')

const router = express.Router()

const userValidationMiddleware = validation(userJoiSchema)

router.post('/signup', userValidationMiddleware, tryCatchWrapper(ctrl.register))

router.post('/login', userValidationMiddleware, tryCatchWrapper(ctrl.login))

router.get(
  '/logout',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.logout)
)

router.get(
  '/current',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.current)
)

module.exports = router
