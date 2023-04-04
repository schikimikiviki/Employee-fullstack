// https://mongoosejs.com/

const mongoose = require('mongoose');

const { Schema } = mongoose;

const EquipmentSchema = new Schema({
  name: String,
  type: String,
  place: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
