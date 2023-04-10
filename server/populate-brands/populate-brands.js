require('dotenv').config();
const mongoose = require('mongoose');
const BrandModel = require('../db/brand.model');
const brands = require('./brands.json');

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error('Missing MONGO_URL environment variable');
  process.exit(1);
}

const populateBrands = async () => {
  await BrandModel.deleteMany({});

  await BrandModel.create(brands);
  console.log('Brands created');
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateBrands();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
