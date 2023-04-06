require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./db/employee.model');
const Equipment = require('./db/equipment.model');

//When you call EmployeeModel.find() or EmployeeModel.findById(),
//it sends a query to the MongoDB database and returns a promise
//that resolves to an array of employee documents
// (in the case of find()) or a single employee document
//(in the case of findById()).

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error('Missing MONGO_URL environment variable');
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get('/api/employees/', async (req, res) => {
  const employees = await Employee.find().sort({ created: 'desc' });
  return res.json(employees);
});

app.get('/api/employees/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  return res.json(employee);
});

app.post('/api/employees/', async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await Employee.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch('/api/employees/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete('/api/employees/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get('/employees/statistics/', async (req, res) => {
  let totalCount = await Employee.countDocuments();
  let juniorCount = await Employee.find({ level: 'Junior' }).countDocuments();
  let mediorCount = await Employee.find({ level: 'Medior' }).countDocuments();
  let seniorCount = await Employee.find({ level: 'Senior' }).countDocuments();
  let expertCount = await Employee.find({ level: 'Expert' }).countDocuments();
  let godlikeCount = await Employee.find({ level: 'Godlike' }).countDocuments();

  res.json({
    total: totalCount,
    byLevel: {
      Junior: juniorCount,
      Medior: mediorCount,
      Senior: seniorCount,
      Expert: expertCount,
      Godlike: godlikeCount,
    },
  });
});

app.get('/employees/superheros', async (req, res) => {
  let heros = await Employee.find({ position: 'Superhero' });
  res.json(heros);
});

app.get('/employees/:search', async (req, res) => {
  let searchName = req.params.search.replace(/%20/g, ' ');

  let regex = new RegExp(searchName, 'i');
  let foundName = await Employee.find({ name: { $regex: regex } });
  res.json(foundName);
});

app.get('/api/equipment', async (req, res) => {
  const equipment = await Equipment.find().sort({ created: 'desc' });
  return res.json(equipment);
});

app.post('/api/equipment/', async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await Equipment.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch('/api/equipment/:id', async (req, res, next) => {
  try {
    const equipment = await Equipment.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

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
