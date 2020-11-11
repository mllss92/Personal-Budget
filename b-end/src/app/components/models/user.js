const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true }
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;