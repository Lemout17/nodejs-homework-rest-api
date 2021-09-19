const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../models/user')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  const { _id } = req.user
  const { path: tempPath, originalname } = req.file
  const uploadPath = path.join(avatarsDir, `${_id}`)
  const avatarPath = path.join(uploadPath, originalname)

  try {
    const readFile = await Jimp.read(tempPath)
    await readFile.resize(250, 250).write(tempPath)

    await fs.mkdir(uploadPath)
    await fs.rename(tempPath, avatarPath)
    const avatar = `/avatars/${_id}/${originalname}`
    await User.findByIdAndUpdate(_id, { avatar })
    res.json({
      status: 'success',
      code: 200,
      data: {
        avatar,
      },
    })
  } catch (error) {
    await fs.unlink(tempPath)
    throw error
  }
}

module.exports = updateAvatar
