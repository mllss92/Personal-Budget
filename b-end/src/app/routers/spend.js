const route = require('express').Router();

const controller = require('./../components/controllers/spend');

module.exports = () => {

  route.post('/add', controller.spendAdd);

  return route
}