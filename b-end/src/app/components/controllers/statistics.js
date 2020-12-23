const users = require('./../models/user');
const moment = require('moment');

const getSpendsValue = require('./../helpers/spends.helper');
const getExpensesValue = require('./../helpers/expenses.helper');
const getMonthIncome = require('./../helpers/month-income.helper');


const getSpendStatistics = async (req, res) => {
  try {
    const user = await users.findOne({ _id: req.user._id });
    const userSpends = await getSpendsValue(user, req.body.month);
    const spends = userSpends.map(el => {
      return { name: el.name, value: el.value }
    }).sort((a, b) => a.value < b.value ? 1 : -1);

    const expenses = await getExpensesValue(user, req.body.month);

    const result = {
      spends: spends,
      expenses: expenses
    }

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

const getSavingStatistics = async (req, res) => {
  try {
    const user = await users.findOne({ _id: req.user._id });
    const monthIncome = await getMonthIncome(user, req.body.month)
      .then(value => {
        return value.reduce((acc, value) => acc += value)
      })

    const result = {
      income: monthIncome,
      savings: user.savings.map(el => {
        const month = el.list.find(e => e.month === req.body.month);
        return {
          name: el.name,
          value: month ? month.value : 0
        }
      }).sort((a, b) => a.value < b.value ? 1 : -1)
    }

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

const getAmountStatistics = async (req, res) => {
  const previousMonth = moment(new Date(req.body.month.replace('.', '.01.'))).add(-1, 'month').format('MM.yyyy');
  try {
    const user = await users.findOne({ _id: req.user._id });

    const thisMonthIncome = await getMonthIncome(user, req.body.month);
    const previousMonthIncome = await getMonthIncome(user, previousMonth);
    const thisMonthExpenses = await getExpensesValue(user, req.body.month);
    const previousMonthExpenses = await getExpensesValue(user, previousMonth);

    const result = [
      {
        name: "Income",
        series: [
          {
            name: previousMonth,
            value: previousMonthIncome.reduce((acc, value) => acc += value)
          },
          {
            name: req.body.month,
            value: thisMonthIncome.reduce((acc, value) => acc += value)
          }
        ]
      },
      {
        name: "Expenses",
        series: [
          {
            name: previousMonth,
            value: previousMonthExpenses
          },
          {
            name: req.body.month,
            value: thisMonthExpenses
          }
        ]
      }
    ]

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  getSpendStatistics,
  getSavingStatistics,
  getAmountStatistics
}