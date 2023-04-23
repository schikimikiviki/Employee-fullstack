import mongoose from 'mongoose';

const { Schema } = mongoose;

const BrandSchema = new mongoose.Schema({
  name: String,
  description: String,
  logo: String,
  foundedIn: String,
});

const Brand = mongoose.model('Brand', BrandSchema);

export default Brand;
