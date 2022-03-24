import { Request, Response } from 'express';
import { loginService, validateService } from '../service/loginService';
import { LoginUser } from '../interface/User';
import ResponseStatusMessage from '../interface/Response';

async function login(req: Request, res: Response): Promise<void> {
  const { email, password }: LoginUser = req.body;

  const response: ResponseStatusMessage = await loginService({ email, password });
  res.status(response.status).json(response.message);
}

async function validate(req: Request, res: Response): Promise<void> {
  const { authorization } = req.headers;

  const response: ResponseStatusMessage = await validateService(authorization);
  res.status(response.status).json(response.message);
}

export {
  login,
  validate,
};
