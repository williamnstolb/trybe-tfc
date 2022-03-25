import { Request, Response } from 'express';
import { loginService, validateService } from '../service/loginService';
import { LoginUser } from '../interface/User';
import ResponseStatusMessage from '../interface/Response';

async function login(req: Request, res: Response) {
  const { email, password }: LoginUser = req.body;

  const { status, message }: ResponseStatusMessage = await loginService({ email, password });
  if (status !== 200) {
    res.status(status).json({ message });
  } else {
    res.status(status).json(message);
  }
}

async function validate(req: Request, res: Response): Promise<void> {
  const { authorization } = req.headers;

  const { status, message }: ResponseStatusMessage = await validateService(authorization);
  res.status(status).json(message);
}

export {
  login,
  validate,
};
