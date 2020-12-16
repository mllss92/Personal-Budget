const route = require('express').Router();

const controller = require('./../components/controllers/history');

module.exports = () => {

  route.post('/get', controller.getHistory);

  return route
}