import express from 'express';
const otherRouter = express.Router();

import {
  getStatistics,
  getSuperheros,
  getSearchQuery,
} from '../controllers/otherControllers.js';

otherRouter.route('/statistics').get(getStatistics);

otherRouter.route('/superheros').get(getSuperheros);

otherRouter.route('/search/:query').get(getSearchQuery);

export default otherRouter;
