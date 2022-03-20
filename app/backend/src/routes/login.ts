import * as express from 'express';

const route = express.Router();

route.post('/', async (req, res) => {
  res.send('outro teste');
});

export default route;
