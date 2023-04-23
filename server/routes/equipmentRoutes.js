import express from 'express';
const equipmentRouter = express.Router();

import {
  getEquipment,
  getSingleEquipment,
  postEquipment,
  patchEquipment,
  deleteEquipment,
} from '../controllers/equipmentControllers.js';

equipmentRouter.route('/').get(getEquipment).post(postEquipment);

equipmentRouter
  .route('/:id')
  .get(getSingleEquipment)
  .patch(patchEquipment)
  .delete(deleteEquipment);

export default equipmentRouter;
