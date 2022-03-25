import { compare } from 'bcryptjs';
import Message from '../utils/message';
import StatusCode from '../utils/statusCode';
import { IPasswordValidate } from '../interface/User';
import ResponseStatusMessage from '../interface/Response';
import { ICreateMatch } from '../interface/match';

async function emailValidation(email: string) {
  const emailFormat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email) {
    return { message: Message.FIELD_MUST_BE_FILLED, status: StatusCode.UNAUTHORIZED };
  }

  if (!(email.match(emailFormat))) {
    return { message: Message.INCORRECT_EMAIL_OR_PASSWORD, status: StatusCode.UNAUTHORIZED };
  }
  return false;
}

async function passwordValidation(password: string) {
  if (!password) {
    return { message: Message.FIELD_MUST_BE_FILLED, status: StatusCode.UNAUTHORIZED };
  }

  if (password.length < 6) {
    return { message: Message.INCORRECT_EMAIL_OR_PASSWORD, status: StatusCode.UNAUTHORIZED };
  }
  return false;
}

async function passwordCorrect({ password, userPw }: IPasswordValidate): Promise<boolean> {
  const passwordOk = await compare(password, userPw);
  return passwordOk;
}

async function createMatchValidation(match: ICreateMatch): Promise<ResponseStatusMessage> {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;
  if (!inProgress || !homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals) {
    return { status: StatusCode.BAD_REQUEST, message: Message.FIELD_MUST_BE_FILLED };
  }

  if (awayTeam === homeTeam) {
    return { status: StatusCode.BAD_REQUEST, message: Message.SAME_TEAMS };
  }

  return { status: StatusCode.CREATED, message: '' };
}

export {
  emailValidation,
  passwordValidation,
  passwordCorrect,
  createMatchValidation,
};
