import * as express from 'express';

const route = express.Router();

route.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send('ok');
});

export default route;
