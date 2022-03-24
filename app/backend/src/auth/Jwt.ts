import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import { Token } from '../interface/JwtInteface';

const config = { expiresIn: '1d', algorithm: 'HS256' };
const KEY = 'jwt.evaluation.key';
// const DEFINITELY_NOT_SECRET_KEY = fs.readFile('jwt.evaluation.key', 'utf8');

async function tokenGenerator(keyForToken: Token): Promise<string> {
  const DEFINITELY_NOT_SECRET_KEY = await fs.readFile(KEY, 'utf8');
  const token = jwt.sign(keyForToken, DEFINITELY_NOT_SECRET_KEY, config as jwt.SignOptions);
  return token;
}

async function validateToken(authorization: string | undefined) {
  if (!authorization) return false;
  const DEFINITELY_NOT_SECRET_KEY: string = await fs.readFile(KEY, 'utf8');
  return jwt.verify(authorization, DEFINITELY_NOT_SECRET_KEY);
}

async function decodeToken(
  authorization: string | undefined,
): Promise<string | jwt.JwtPayload | null> {
  const DEFINITELY_NOT_SECRET_KEY: string = await fs.readFile(KEY, 'utf8');
  if (!authorization) return null;
  const decoded = jwt.verify(authorization, DEFINITELY_NOT_SECRET_KEY);
  const { role } = decoded as jwt.JwtPayload;

  return role;
}

export { tokenGenerator, validateToken, decodeToken };
