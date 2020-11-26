const users = require('./../models/user');

const getSpendsValue = require('./../helpers/spends.helper');
const getExpensesValue = require('./../helpers/expenses.helper');


const getStatistics = async (req, res) => {
  try {
    const user = await users.findOne({ _id: req.user._id });
    const spends = await getSpendsValue(user, req.body.month);
    const expenses = await getExpensesValue(user, req.body.month);

    const result = {
      spends: spends,
      expenses: expenses
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  getStatistics
}