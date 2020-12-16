const history = require('./../models/history');

const historyAdd = async (req, res) => {
  try {
    history.create(req)
  } catch (error) {
    console.log(error);
  }
}

const getHistory = async (req, res) => {
  const id = req.user._id;
  const month = req.body.month;
  try {
    const userHistory = await history.find({ userId: id, month: month }, { _id: false, __v: false, month: false, userId: false })

    res.status(200).json(userHistory);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  historyAdd,
  getHistory
}