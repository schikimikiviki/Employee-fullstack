import express from 'express';
const brandRouter = express.Router();

import {
  getBrand,
  getSingleBrand,
  postBrand,
  patchBrand,
  deleteBrand,
} from '../controllers/brandControllers.js';

brandRouter.route('/').get(getBrand).post(postBrand);

brandRouter
  .route('/:id')
  .get(getSingleBrand)
  .patch(patchBrand)
  .delete(deleteBrand);

export default brandRouter;
