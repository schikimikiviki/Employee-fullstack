import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import BrandModel from '../db/brand.model';
import brands from './brands.json';

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
