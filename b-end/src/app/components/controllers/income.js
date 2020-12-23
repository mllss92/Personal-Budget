const users = require('./../models/user');
const history = require('./../models/history');

const addIncome = async (req, res) => {
  try {
    const user = await users.findOneAndUpdate({ _id: req.user._id }, { $inc: { 'income.avalibleToDistribute': req.body.value } }, { new: true });
    const result = {
      avalibleToDistribute: user.income.avalibleToDistribute
    };
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

const distributeIncome = async (req, res) => {
  try {
    const user = await users.findOne({ _id: req.user._id });
    user.income.avalibleToDistribute -= req.body.value;
    user.balance += req.body.value;
    const saving = user.savings.find(el => el._id.toString() === req.body.savingId);
    saving.value += req.body.value;
    saving.list.find(el => el.month === req.body.month).value += req.body.value;
    const month = user.income.list.find(el => el.month === req.body.month);
    month.value.push(req.body.value);
    await user.save();

    history.create({
      userId: req.user._id,
      type: 'income',
      to: saving.name,
      value: req.body.value,
      date: Date.now()
    });

    const result = {
      balance: user.balance,
      monthIncome: month.value,
      avalibleToDistribute: user.income.avalibleToDistribute,
      savings: user.savings
    }


    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

const editIncome = async (req, res) => {
  try {
    const user = await users.findByIdAndUpdate({ _id: req.user._id }, { 'income.avalibleToDistribute': req.body.value }, { new: true });
    const result = {
      avalibleToDistribute: user.income.avalibleToDistribute
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  addIncome,
  distributeIncome,
  editIncome
}