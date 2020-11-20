const Router = require('express').Router;
const passport = require('passport');

const auth = require('./auth');
const income = require('./income');
const category = require('./category');

module.exports = () => {
  const routing = Router();

  routing.use('/auth', auth());
  routing.use('/income', passport.authenticate('jwt', { session: false }), income());
  routing.use('/category', passport.authenticate('jwt', { session: false }), category());

  return routing
}