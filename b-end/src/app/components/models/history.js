const mongoose = require('mongoose');

const HistorySchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  fromSaving: { type: String, required: true },
  toSpend: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('History', HistorySchema);