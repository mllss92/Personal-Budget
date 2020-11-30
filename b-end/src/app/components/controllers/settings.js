const users = require('./../models/user');

const getSettings = async (req, res) => {
  try {
    const user = await users.findOne({ _id: req.user._id });
    const result = {
      name: user.name,
      lastName: user.lastName,
      email: user.email
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  getSettings
}
