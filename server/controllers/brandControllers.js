import Brand from '../db/brand.model.js';

export const getBrand = async (req, res, next) => {
  const brands = await Brand.find().sort({ created: 'desc' });
  return res.json(brands);
};

export const getSingleBrand = async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);
  return res.json(brand);
};

export const postBrand = async (req, res, next) => {
  const brand = req.body;

  try {
    const saved = await Brand.create(brand);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
};

export const patchBrand = async (req, res, next) => {
  try {
    const brand = await Brand.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(brand);
  } catch (err) {
    return next(err);
  }
};

export const deleteBrand = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id);
    const deleted = await brand.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
};
