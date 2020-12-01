const users = require('./../models/user');

const getSettings = async (req, res) => {
  try {
    const user = await users.findOne({ _id: req.user._id });
    const result = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      photoSrc: user.photoSrc
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

const uploadPhoto = async (req, res) => {
  try {
    const user = await users.findOneAndUpdate({ _id: req.user._id }, { photoSrc: req.file.path }, { new: true });
    res.status(200).json(req.file);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  getSettings,
  uploadPhoto
}
