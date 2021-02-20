import { Router } from 'express';
import { riderRegisterController } from '../controllers/rider.controller';

const riderRouter = Router()

riderRouter.route('/register').post(riderRegisterController);

export default riderRouter;