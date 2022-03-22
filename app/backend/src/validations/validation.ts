import { compareSync, hash } from 'bcryptjs';
import User from '../database/models/User';
import { IUser } from '../interface/User';

// export default async function passwordCorrect(email: string, password: string): Promise<boolean> {
//   const user: IUser | null = await User.findOne({ where: { email } });
//   if (user && password === user.password) {
//     return true;
//   }
//   return false;
// }

export default async function passawordCorrect(email: string, password: string): Promise<boolean> {
  const user: IUser | null = await User.findOne({ where: { email } });
  if (user) {
    const userPw = await hash(user.password, 10);
    return compareSync(password, userPw);
  }
  return false;
}

// export default {
//   passawordCorrect,
// };
