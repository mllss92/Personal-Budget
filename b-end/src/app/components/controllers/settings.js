const users = require('./../models/user');

const getSettings = async (req, res) => {
  try {

    res.status(200).json('Some settings data...')
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  getSettings
}
