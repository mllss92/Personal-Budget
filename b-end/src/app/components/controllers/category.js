const users = require('./../models/user');
const moment = require('moment');

const getSpendsValue = require('./../helpers/spends.helper');
const defaultDate = moment().format('MM.YYYY');

const createSpend = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      image: req.body.image,
      list: [{
        month: defaultDate,
        value: 0
      }]
    }
    const user = await users.findOneAndUpdate({ _id: req.user._id }, { $push: { spends: data } }, { new: true });
    const result = {
      spends: await getSpendsValue(user, defaultDate)
    };
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

const createSaving = async (req, res) => {
  try {
    const user = await users.findOneAndUpdate({ _id: req.user._id }, { $push: { savings: req.body } }, { new: true });
    const result = {
      savings: user.savings
    };
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Some server error. Try again later' })
  }
}

module.exports = {
  createSpend,
  createSaving
}