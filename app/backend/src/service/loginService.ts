// import { compareSync } from 'bcryptjs';
import { LoginUser, IUser, UserFounded } from '../interface/User';
import User from '../database/models/User';
import tokenGenerator from '../auth/Jwt';
import StatusCode from '../utils/statusCode';
import Message from '../utils/message';

async function loginService({ email, password }: LoginUser) {
  const userComplete: IUser | null = await User.findOne({
    where: { email },
    // // Source: https://www.codegrepper.com/code-examples/javascript/how+to+exclude+the+password+when+from+the+User+Model+in+sequelize
    // attributes: { exclude: ['password'] },
  });

  if (!userComplete) {
    return { message: Message.INCORRECT_EMAIL_OR_PASSWORD, status: StatusCode.UNAUTHORIZED };
  }

  const isPasswordMatched = password === userComplete.password;

  if (!isPasswordMatched) {
    return { message: Message.INCORRECT_EMAIL_OR_PASSWORD, status: StatusCode.UNAUTHORIZED };
  }

  const user: UserFounded = {
    id: userComplete.id,
    username: userComplete.username,
    role: userComplete.role,
    email,
  };

  const token = await tokenGenerator({ role: userComplete.role, email: userComplete.email });
  return { message: { user, token }, status: StatusCode.OK };
}

export default loginService;
