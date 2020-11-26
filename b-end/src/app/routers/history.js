const route = require('express').Router();

const controller = require('./../components/controllers/history');

module.exports = () => {

  route.get('/get', controller.getHistory);

  return route
}