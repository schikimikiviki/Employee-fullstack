import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import names from './names.json';
import types from './types.json';
import places from './places.json';
import EquipmentModel from '../db/equipment.model.js';

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error('Missing MONGO_URL environment variable');
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEquipment = async () => {
  await EquipmentModel.deleteMany({});

  const equipments = names.map((name) => ({
    name,
    type: pick(types),
    place: pick(places),
  }));

  await EquipmentModel.create(...equipments);
  console.log('Equipments created');
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipment();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
