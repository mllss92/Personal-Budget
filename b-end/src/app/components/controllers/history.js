const history = require('./../models/history');

const historyAdd = async (req, res) => {
  try {
    history.create(req)
  } catch (error) {
    console.log(error);
  }
}

const getHistory = async (req, res) => {
  try {
    const userHistory = await history.find({ userId: req.user._id })

    res.status(200).json(userHistory);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  historyAdd,
  getHistory
}