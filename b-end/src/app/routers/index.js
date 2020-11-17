const Router = require('express').Router;

const auth = require('./auth');
const income = require('./income');

module.exports = () => {
  const routing = Router();

  routing.use('/auth', auth());
  routing.use('/income', income());

  return routing
}