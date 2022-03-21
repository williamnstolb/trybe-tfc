import * as jwt from 'jsonwebtoken';
// import { readFile } from 'fs/promises';
import { Token } from '../interface/JwtInteface';

const secretKey = 'jwt.evaluation.key';

async function tokenGenerator({ role, email }: Token): Promise<string> {
  // const secretKey = await readFile('jwt.evaluation.key', 'utf8');
  const token = jwt.sign({ role, email }, secretKey, {
    algorithm: 'HS256',
    expiresIn: '5d',
  });

  return token;
}

async function validateToken(authorization: string | undefined): Promise<boolean> {
  // jwt.verify(authorization, secretKey);
  // return jwt.decode(authorization, { complete: true });
  if (!authorization) return false;
  return true;
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
