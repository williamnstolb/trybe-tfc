import { compare } from 'bcryptjs';
import { Op } from 'sequelize';
import Message from '../utils/message';
import StatusCode from '../utils/statusCode';
import { IPasswordValidate } from '../interface/User';
import ResponseStatusMessage from '../interface/Response';
import { ICreateMatch, ITeamExist } from '../interface/match';
import Match from '../database/models/Match';

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

async function searchTeam({ homeTeam, awayTeam }: ITeamExist) {
  // source: https://www.codegrepper.com/code-examples/javascript/op+in+sequelize
  const team = await Match.findAll({
    where: {
      [Op.or]: [{ id: homeTeam }, { id: awayTeam }],
    },
  });

  return (!team[0] || !team[1]);
}

async function createMatchValidation(match: ICreateMatch): Promise<ResponseStatusMessage> {
  const { homeTeam, awayTeam } = match;
  // if (!inProgress || !homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals) {
  //   return { status: StatusCode.UNAUTHORIZED, message: Message.FIELD_MUST_BE_FILLED };
  // }

  if (awayTeam === homeTeam) {
    return { status: StatusCode.UNAUTHORIZED, message: Message.SAME_TEAMS };
  }

  const anyTeamNotExist = await searchTeam({ homeTeam, awayTeam });
  console.log(anyTeamNotExist);

  if (anyTeamNotExist) {
    return { status: StatusCode.UNAUTHORIZED, message: Message.TEAM_NOT_EXIST };
  }

  return { status: StatusCode.CREATED, message: '' };
}

export {
  emailValidation,
  passwordValidation,
  passwordCorrect,
  createMatchValidation,
};
