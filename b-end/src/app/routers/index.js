const Router = require('express').Router;

const auth = require('./auth');

module.exports = () => {
  const routing = Router();

  routing.use('/auth', auth());

  return routing
}