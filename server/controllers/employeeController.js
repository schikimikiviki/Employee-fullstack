import Employee from '../db/employee.model.js';
import mongoose from 'mongoose';

export const getEmployee = async (req, res, next) => {
  const employees = await Employee.find().sort({ created: 'desc' });
  return res.json(employees);
};

export const getSingleEmployee = async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);
  return res.json(employee);
};

export const postEmployee = async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await Employee.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
};

export const patchEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          favoriteBrand: mongoose.Types.ObjectId(req.body.favoriteBrand),
        },
      },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
};
