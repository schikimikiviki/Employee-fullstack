const express = require('express');
const router = express.Router();

const Employee = require('../db/employee.model');

router.get('/', async (req, res) => {
  const employees = await Employee.find().sort({ created: 'desc' });
  return res.json(employees);
});

router.get('/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  return res.json(employee);
});

router.post('/', async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await Employee.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
