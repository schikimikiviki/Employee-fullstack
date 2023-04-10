const express = require('express');
const router = express.Router();

const Equipment = require('../db/equipment.model');

router.get('/', async (req, res) => {
  const equipment = await Equipment.find().sort({ created: 'desc' });
  return res.json(equipment);
});

router.get('/:id', async (req, res) => {
  const equipment = await Equipment.findById(req.params.id);
  return res.json(equipment);
});

router.post('/', async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await Equipment.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
