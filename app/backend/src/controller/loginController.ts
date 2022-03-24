import { Request, Response } from 'express';
import { loginService, validateService } from '../service/loginService';
import { LoginUser } from '../interface/User';
import ResponseStatusMessage from '../interface/Response';

async function login(req: Request, res: Response) {
  const { email, password }: LoginUser = req.body;
  const response: ResponseStatusMessage = await loginService({ email, password });
  res.status(response.status).json(response.message);
}

async function validate(req: Request, res: Response) {
  const { authorization } = req.headers;

  // if (!authorization) { res.status(404).json({ message: 'Unauthorized' }); }

  const response: ResponseStatusMessage = await validateService(authorization);
  res.status(response.status).json(response.message);
}

export {
  login,
  validate,
};
