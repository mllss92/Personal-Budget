const route = require('express').Router();

const controller = require('./../components/controllers/income');

module.exports = () => {

  route.post('/add', controller.addIncome);
  route.post('/distribute', controller.distributeIncome);

  return route
}