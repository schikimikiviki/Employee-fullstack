import express from 'express';
const employeeRouter = express.Router();

import {
  getEmployee,
  getSingleEmployee,
  postEmployee,
  patchEmployee,
  deleteEmployee,
} from '../controllers/employeeController.js';

employeeRouter.route('/').get(getEmployee).post(postEmployee);

employeeRouter
  .route('/:id')
  .get(getSingleEmployee)
  .patch(patchEmployee)
  .delete(deleteEmployee);

export default employeeRouter;
