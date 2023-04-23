import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

import employeeRoutes from './routes/employeeRoutes.js';
import equipmentRoutes from './routes/equipmentRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import otherRoutes from './routes/otherRoutes.js';

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error('Missing MONGO_URL environment variable');
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/other', otherRoutes);

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log('App is listening on 8080');
    console.log('Try /api/employees route right now');
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
