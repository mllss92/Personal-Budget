const route = require('express').Router();

const controller = require('./../components/controllers/statistics');

module.exports = () => {

  route.post('/get', controller.getStatistics);

  return route
}