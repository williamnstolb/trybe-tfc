import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import { Token } from '../interface/JwtInteface';

export default async function tokenGenerator({ role, email }: Token): Promise<string> {
  const secretKey = await fs.readFile('jwt.evaluation.key', 'utf8');
  const token = jwt.sign({ role, email }, secretKey, {
    algorithm: 'HS256',
    expiresIn: '5d',
  });
  return token;
}
