const Router = require('express').Router;
const passport = require('passport');

const auth = require('./auth');
const income = require('./income');
const category = require('./category');
const spend = require('./spend');
const history = require('./history');
const statistics = require('./statistics');
const settings = require('./settings');

module.exports = () => {
  const routing = Router();

  routing.use('/auth', auth());
  routing.use('/income', passport.authenticate('jwt', { session: false }), income());
  routing.use('/category', passport.authenticate('jwt', { session: false }), category());
  routing.use('/spend', passport.authenticate('jwt', { session: false }), spend());
  routing.use('/history', passport.authenticate('jwt', { session: false }), history());
  routing.use('/statistics', passport.authenticate('jwt', { session: false }), statistics());
  routing.use('/settings', passport.authenticate('jwt', { session: false }), settings());

  return routing
}