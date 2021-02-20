import { Router } from 'express';
import driversRoute from './drivers';
import usersRoute from './users';

const dbRouter = Router();

dbRouter.use('/geo/driver', driversRoute);
dbRouter.use('/geo/user', usersRoute);

export default dbRouter;