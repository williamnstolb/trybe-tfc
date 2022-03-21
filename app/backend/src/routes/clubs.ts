import * as express from 'express';
import getAll from '../controller/clubsController';

const route = express.Router();

route.get('/', getAll);

export default route;
