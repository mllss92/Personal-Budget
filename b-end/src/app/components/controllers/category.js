const users = require('./../models/user');

const createSpend = async (req, res) => {
  try {
    const user = await users.findOneAndUpdate({ _id: req.user._id }, { $push: { spends: req.body } }, { new: true });
    const month = user.income.list.find(el => el.month === req.body.month);

    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

const createSaving = async (req, res) => {
  try {
    console.log(req.body);
    // const user = await users.findOneAndUpdate({ _id: req.user._id }, { $push: { savings: req.body } }, { new: true });
    // const month = user.income.list.find(el => el.month === req.body.month);

    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  createSpend,
  createSaving
}