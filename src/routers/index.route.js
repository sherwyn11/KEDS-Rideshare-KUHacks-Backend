import { Router } from 'express';
import riderRouter from './rider.route';
import driverRouter from './driver.route';

const router = Router();

router.use('/rider', riderRouter);
router.use('/driver', driverRouter);

export default router;