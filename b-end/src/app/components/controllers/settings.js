const users = require('./../models/user');
const bcrypt = require('bcrypt');

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
    const user = await users.findOneAndUpdate({ _id: req.user._id }, { photoSrc: req.file.path });
    res.status(200).json(req.file);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

const confirmPassword = async (req, res) => {
  try {
    const user = await users.findOne({ _id: req.user._id });
    const isSame = bcrypt.compareSync(req.body.password, user.password);
    if (!isSame) {
      return res.status(409).json({ message: 'Passwords do not match!' })
    }
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

const saveChanges = async (req, res) => {
  const data = req.body;
  try {
    if (data.password) {
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
    }
    if (data.email) {
      const isExist = await users.findOne({ email: data.email });
      if (isExist) {
        return res.status(409).json({ message: 'User with this e-mail address already exists!' })
      }
    }
    const user = await users.findOneAndUpdate({ _id: req.user._id }, data, { new: true });
    const result = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      photoSrc: user.photoSrc
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  getSettings,
  uploadPhoto,
  confirmPassword,
  saveChanges
}
