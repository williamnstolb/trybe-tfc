import * as express from 'express';
import { login, validate } from '../controller/loginController';

const route = express.Router();

route.get('/validate', validate);
route.post('/', login);

export default route;
