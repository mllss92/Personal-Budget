const Users = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('./../../../configs/jwt');

const getMonthIncome = require('./../helpers/month-income.helper');
const getSpendsValue = require('./../helpers/spends.helper');
const getExpensesValue = require('./../helpers/expenses.helper');

const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await Users.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({ message: 'User with this e-mail address does not exist!' })
    }
    const isSame = bcrypt.compareSync(data.password, user.password);
    if (!isSame) {
      return res.status(401).json({ message: 'The password you have entered is invalid!' })
    }
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      jwtConfig.key,
      jwtConfig.config
    );
    const monthIncome = await getMonthIncome(user, data.month);
    const spends = await getSpendsValue(user, data.month);
    const expenses = await getExpensesValue(user, data.month);

    const result = {
      fullName: `${user.name} ${user.lastName}`,
      _id: user._id,
      token: `Bearer ${token}`,
      balance: user.balance,
      monthIncome: monthIncome,
      avalibleToDistribute: user.income.avalibleToDistribute,
      savings: user.savings,
      spends: spends,
      login: true,
      expenses: expenses
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' })
  }
}

const register = async (req, res) => {
  try {
    const user = req.body;
    const isAlreadyExist = await Users.findOne({ email: user.email });
    if (isAlreadyExist) {
      return res.status(409).json({ message: 'User with this email address already exists!' })
    }
    const salt = bcrypt.genSaltSync(10);

    user.name = user.name[0].toUpperCase() + user.name.toLowerCase().slice(1);
    user.lastName = user.lastName[0].toUpperCase() + user.lastName.toLowerCase().slice(1);
    user.password = bcrypt.hashSync(user.password, salt);

    Users.create(user)
      .finally(() => {
        res.status(201).json(true)
      })

  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' })
  }
}

module.exports = {
  login,
  register
}