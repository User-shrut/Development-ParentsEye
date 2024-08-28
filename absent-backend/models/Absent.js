const mongoose = require('mongoose');

const AbsentSchema = new mongoose.Schema({
  name: String,
  date: Date,
  reason: String,
  isSelected: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Absent', AbsentSchema);
