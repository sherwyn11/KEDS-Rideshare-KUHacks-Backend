import { Router } from 'express';
import { requestRide } from '../controllers/rider.controller';

const riderRouter = Router()

riderRouter.route('/request-ride').post(requestRide);

export default riderRouter;