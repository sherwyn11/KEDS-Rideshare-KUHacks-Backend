import { Router } from 'express';
import driversRoute from './drivers';
import usersRoute from './users';

const dbRouter = Router();

dbRouter.use('/geo/driver', driversRoute);
dbRouter.use('/geo/user', usersRoute);

export default dbRouter;


/** 
 * acc + from geo + to geo -> server -> get all drivers addrs -> get current loc -> find in vicinity of given geo -> return list of drivers 
 */