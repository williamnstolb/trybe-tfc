// import { hash } from 'bcrypt';
import { LoginUser, IUser } from '../interface/User';
import User from '../database/models/User';
import { tokenGenerator, validateToken, decodeToken } from '../auth/Jwt';
import StatusCode from '../utils/statusCode';
import Message from '../utils/message';
import { emailValidation, passwordCorrect, passwordValidation } from '../validations/validation';

const makeUser = (user: IUser) => {
  const { id, username, role, email } = user;
  return { id, username, role, email };
};

async function loginService({ email, password }: LoginUser) {
  const emailNotOk = await emailValidation(email);
  if (emailNotOk) return emailNotOk;

  const passwordNotOk = await passwordValidation(password);
  if (passwordNotOk) return passwordNotOk;

  const userComplete: IUser | null = await User.findOne({ where: { email }, raw: true });
  if (!userComplete) {
    return { message: Message.INCORRECT_EMAIL_OR_PASSWORD, status: StatusCode.UNAUTHORIZED };
  }

  // const passwordMatched: string = await hash(password, 10);
  const userPw: string = userComplete.password;
  const isPasswordMatched: boolean = await passwordCorrect({ password, userPw });
  if (!isPasswordMatched) {
    return { message: Message.INCORRECT_EMAIL_OR_PASSWORD, status: StatusCode.UNAUTHORIZED };
  }

  const user = makeUser(userComplete);

  const token = await tokenGenerator({ role: userComplete.role, email: userComplete.email });

  return { message: { user, token }, status: StatusCode.OK };
}

async function validateService(authorization: string | undefined) {
  const tokenOk = await validateToken(authorization);

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
