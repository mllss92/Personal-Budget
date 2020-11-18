const Router = require('express').Router;
const passport = require('passport');

const auth = require('./auth');
const income = require('./income');

module.exports = () => {
  const routing = Router();

  routing.use('/auth', auth());
  routing.use('/income', passport.authenticate('jwt', { session: false }), income());

  return routing
}