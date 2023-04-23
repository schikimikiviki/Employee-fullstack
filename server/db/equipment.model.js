// https://mongoosejs.com/

import mongoose from 'mongoose';

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

const Equipment = mongoose.model('Equipment', EquipmentSchema);

export default Equipment;
