/*
Loading the .env file and creates environment variables from it
*/
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import names from './names.json';
import levels from './levels.json';
import positions from './positions.json';
import EmployeeModel from '../db/employee.model';
import BrandModel from '../db/brand.model';

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error('Missing MONGO_URL environment variable');
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const brands = await BrandModel.find({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    brand: pick(brands)._id,
  }));

  await EmployeeModel.create(...employees);
  console.log('Employees created');
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
