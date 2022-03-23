import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import { Token } from '../interface/JwtInteface';

async function tokenGenerator({ role, email }: Token): Promise<string> {
  const SECRETKEY = await fs.readFile('jwt.evaluation.key', 'utf8');
  const token = jwt.sign({ role, email }, SECRETKEY, {
    algorithm: 'HS256',
    expiresIn: '5d',
  });

  return token;
}

async function validateToken(authorization: string) {
  try {
    const SECRETKEY: string = await fs.readFile('jwt.evaluation.key', 'utf8');
    return jwt.verify(authorization, SECRETKEY);
  } catch (error) {
    return false;
  }
}

async function decodeToken(authorization: string | undefined):
Promise<string | jwt.JwtPayload | null> {
  if (!authorization) return null;
  const decoded = jwt.decode(authorization);
  const { role } = decoded as jwt.JwtPayload;

  return role;
}

export {
  tokenGenerator,
  validateToken,
  decodeToken,
};
