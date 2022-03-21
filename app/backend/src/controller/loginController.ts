import { Request, Response } from 'express';
import loginService from '../service/loginService';
import { LoginUser } from '../interface/User';
import StatusCode from '../utils/statusCode';

async function login(req: Request, res: Response) {
  const { email, password }: LoginUser = req.body;
  const response = await loginService({ email, password });
  res.status(StatusCode.OK).json(response);
}

export default login;
