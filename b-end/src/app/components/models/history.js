const mongoose = require('mongoose');
const moment = require('moment');

const HistorySchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  type: { type: String, required: true },
  month: { type: String, default: moment().format('MM.yyyy') },
  from: { type: String, default: '- - - - -' },
  to: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('History', HistorySchema);