const route = require('express').Router();

const controller = require('./../components/controllers/settings');
const upload = require('./../components/middleware/upload');

module.exports = () => {

  route.get('/get', controller.getSettings);
  route.post('/upload', upload.single('image'), controller.uploadPhoto);
  route.post('/confirm-password', controller.confirmPassword);
  route.patch('/save-changes', controller.saveChanges);

  return route
}