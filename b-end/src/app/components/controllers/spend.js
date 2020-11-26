const users = require('./../models/user');
const history = require('./history');

const getSpendsValue = require('./../helpers/spends.helper');
const getExpensesValue = require('./../helpers/expenses.helper');

const spendAdd = async (req, res) => {
  try {
    const data = req.body;
    const user = await users.findOne({ _id: req.user._id });
    const spend = user.spends.find(el => el._id.toString() === data.spendId);
    if (!spend) {
      return res.status(404).json({ message: 'Spend category not found' });
    }
    const thisMonth = spend.list.find(el => el.month === data.month);
    if (thisMonth === undefined || thisMonth === null) {
      return res.status(404).json({ message: 'Some server error! Please try relogin' });
    }
    thisMonth.value += data.value;
    const saving = user.savings.find(el => el._id.toString() === data.savingId);
    saving.value -= data.value;
    user.balance -= data.value;

    await user.save();
    history.historyAdd({
      userId: req.user._id,
      fromSaving: saving.name,
      toSpend: spend.name,
      value: data.value
    })

    const spends = await getSpendsValue(user, data.month);
    const expenses = await getExpensesValue(user, data.month);
    const result = {
      balance: user.balance,
      savings: user.savings,
      spends: spends,
      expenses: expenses
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  spendAdd
}