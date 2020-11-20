const route = require('express').Router();

const controller = require('./../components/controllers/category');

module.exports = () => {

  route.post('/create-spend', controller.createSpend);
  route.post('/create-saving', controller.createSaving);

  return route
}