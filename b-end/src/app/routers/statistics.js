const route = require('express').Router();

const controller = require('./../components/controllers/statistics');

module.exports = () => {

  route.post('/spend', controller.getSpendStatistics);
  route.post('/savings', controller.getSavingStatistics);
  route.post('/amount', controller.getAmountStatistics);

  return route
}