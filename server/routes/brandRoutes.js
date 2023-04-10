const express = require('express');
const router = express.Router();

const Brands = require('../db/brand.model');

router.get('/', async (req, res) => {
  const brands = await Brands.find().sort({ created: 'desc' });
  return res.json(brands);
});

router.get('/:id', async (req, res) => {
  const brand = await Brands.findById(req.params.id);
  return res.json(brand);
});

router.post('/', async (req, res, next) => {
  const brand = req.body;

  try {
    const saved = await Brands.create(brand);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const brand = await Brands.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(brand);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const brand = await Brands.findById(req.params.id);
    const deleted = await brand.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
