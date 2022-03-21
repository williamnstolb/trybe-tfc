// import { compare } from 'bcryptjs';
import { LoginUser, IUser } from '../interface/User';
import User from '../database/models/User';
import tokenGenerator from '../auth/Jwt';
import StatusCode from '../utils/statusCode';
import Message from '../utils/message';

async function loginService({ email, password }: LoginUser) {
  const user: IUser | null = await User.findOne({
    where: { email },
    // Source: https://www.codegrepper.com/code-examples/javascript/how+to+exclude+the+password+when+from+the+User+Model+in+sequelize
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return { message: Message.INCORRECT_EMAIL_OR_PASSWORD, status: StatusCode.UNAUTHORIZED };
  }

  // const isPasswordMatched = await compare(password, user.password);

  const token = await tokenGenerator({ role: user.role, email: user.email });
  return { message: { user, token }, status: StatusCode.OK };
}

export default loginService;
