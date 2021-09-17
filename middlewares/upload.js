const multer = require('multer')

const path = require('path')

const tmpDir = path.join(__dirname, '../', 'temp')

const multerConfig = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, tmpDir)
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 1024,
  },
})

const upload = multer({
  storage: multerConfig,
})

module.exports = upload
