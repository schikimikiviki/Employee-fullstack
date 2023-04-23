import Equipment from '../db/equipment.model.js';

export const getEquipment = async (req, res, next) => {
  const equipment = await Equipment.find().sort({ created: 'desc' });
  return res.json(equipment);
};

export const getSingleEquipment = async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.id);
  return res.json(equipment);
};

export const postEquipment = async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await Equipment.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
};

export const patchEquipment = async (req, res, next) => {
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
};

export const deleteEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
};
