const Users = require('./../models/user');

const getIncomes = (req, res) => {
  try {
    res.status(200).json(req.body);
  } catch (error) {

  }
}

module.exports = {
  getIncomes
}