const mongoose = require('mongoose');

const { Schema } = mongoose;

const BrandSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
});

module.exports = mongoose.model('Brand', BrandSchema);
