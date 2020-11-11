const route = require('express').Router();

const controller = require('./../components/controllers/auth');

module.exports = () => {

  route.post('/login', controller.login);
  route.post('/register', controller.register);

  return route
}