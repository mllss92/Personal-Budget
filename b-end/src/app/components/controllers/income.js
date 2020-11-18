const users = require('./../models/user');

const getIncomes = async (req, res) => {
  try {
    const user = await users.findOne({ _id: req.user._id });
    const income = user.income;
    const month = income.list.find((el) => el.month === req.body.month);
    if (!month) {
      user.income.list.push({ month: req.body.month, value: [0] })
      const updatedUser = await user.save();
      const month = updatedUser.income.list.find((el) => el.month === req.body.month);
      const value = {
        avalibleToDistribute: income.avalibleToDistribute,
        value: month.value
      }
      return res.status(201).json(value)
    }
    const value = {
      avalibleToDistribute: income.avalibleToDistribute,
      value: month.value
    }
    res.status(200).json(value);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Data receiving has been failed' });
  }
}

const addIncome = async (req, res) => {
  try {
    const user = await users.findOne({ _id: req.user._id });
    user.income.avalibleToDistribute += req.body.value;
    await user.save();
    res.status(200).json(user.income.avalibleToDistribute);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  getIncomes,
  addIncome
}