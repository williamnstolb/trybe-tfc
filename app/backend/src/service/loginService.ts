// import { compareSync } from 'bcryptjs';
import { LoginUser, IUser } from '../interface/User';
import User from '../database/models/User';
import { tokenGenerator, validateToken, decodeToken } from '../auth/Jwt';
import StatusCode from '../utils/statusCode';
import Message from '../utils/message';
import passwordCorrect from '../validations/validation';

async function loginService({ email, password }: LoginUser) {
  if (!email || !password) {
    return { message: Message.FIELD_MUST_BE_FILLED, status: StatusCode.UNAUTHORIZED };
  }

  const user: IUser | null = await User.findOne({
    where: { email },
    // Source: https://www.codegrepper.com/code-examples/javascript/how+to+exclude+the+password+when+from+the+User+Model+in+sequelize
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return { message: Message.INCORRECT_EMAIL_OR_PASSWORD, status: StatusCode.UNAUTHORIZED };
  }

  const isPasswordMatched: boolean = await passwordCorrect(email, password);

  if (!isPasswordMatched) {
    return { message: Message.INCORRECT_EMAIL_OR_PASSWORD, status: StatusCode.UNAUTHORIZED };
  }

  const token = await tokenGenerator({ role: user.role, email: user.email });
  return { message: { user, token }, status: StatusCode.OK };
}

async function validateService(authorization: string | undefined) {
  const tokenOk = validateToken(authorization);
  if (!tokenOk) {
    return { message: Message.UNAUTHORIZED, status: StatusCode.UNAUTHORIZED };
  }

  const role = await decodeToken(authorization);

  return { message: role, status: StatusCode.OK };
}

export {
  loginService,
  validateService,
};
