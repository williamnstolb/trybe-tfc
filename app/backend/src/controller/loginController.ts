import { Request, Response } from 'express';
import loginService from '../service/loginService';
import { LoginUser } from '../interface/User';
import ResponseStatusMessage from '../interface/Response';

async function login(req: Request, res: Response) {
  const { email, password }: LoginUser = req.body;
  const response: ResponseStatusMessage = await loginService({ email, password });
  res.status(response.status).json(response.message);
}

export default login;
