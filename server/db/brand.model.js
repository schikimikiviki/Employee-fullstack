const mongoose = require('mongoose');

const { Schema } = mongoose;

const BrandSchema = new mongoose.Schema({
  name: String,
  description: String,
  logo: String,
  foundedIn: String,
});

module.exports = mongoose.model('Brand', BrandSchema);
