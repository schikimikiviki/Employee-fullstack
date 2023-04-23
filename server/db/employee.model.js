// https://mongoosejs.com/

import mongoose from 'mongoose';

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  checked: Boolean,
  equipment: [String],
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;
