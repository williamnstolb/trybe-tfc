import * as jwt from 'jsonwebtoken';
// import { readFile } from 'fs/promises';
import { Token } from '../interface/JwtInteface';

const secretKey = 'jwt.evaluation.key';

export default async function tokenGenerator({ role, email }: Token): Promise<string> {
  // const secretKey = await readFile('jwt.evaluation.key', 'utf8');
  const token = jwt.sign({ role, email }, secretKey, {
    algorithm: 'HS256',
    expiresIn: '5d',
  });
  console.log('TOKEN ====>', token);

  return token;
}
