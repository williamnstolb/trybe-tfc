import * as express from 'express';
import login from '../controller/loginController';

const route = express.Router();

route.post('/', login);

export default route;
