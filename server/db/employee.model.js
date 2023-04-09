// https://mongoosejs.com/

const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  checked: Boolean,
  equipment: [String],
  favoriteBrand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FavoriteBrand',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
