const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  balance: { type: Number, default: 0 },
  lastLogin: { type: Date },
  income: {
    avalibleToDistribute: { type: Number, default: 0 },
    list: [
      {
        month: { type: String },
        value: []
      }
    ]
  },
  savings: [{
    name: { type: String, required: true },
    image: { type: String, required: true },
    value: { type: Number, default: 0 }
  }],
  spends: [{
    name: { type: String, required: true },
    image: { type: String, required: true },
    list: [
      {
        month: { type: String },
        value: { type: Number }
      }
    ]
  }]
});

UserSchema.pre("save", function (next) {
  if (this.savings.length === 0) {
    const cash = {
      name: 'cash',
      image: 'money',
      value: 0
    };
    const bank = {
      name: 'bank',
      image: 'account_balance',
      value: 0
    }

    this.savings.push(cash, bank);

    next();
  } else {
    next()
  }
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;