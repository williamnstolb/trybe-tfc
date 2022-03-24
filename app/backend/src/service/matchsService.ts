import QueryString = require('qs');
import { Op } from 'sequelize';
import StatusCode from '../utils/statusCode';
import { getAllInprogress, getAll } from '../utils/matchs';
import { validateToken } from '../auth/Jwt';
import { ICreateMatch, ITeamExist } from '../interface/match';
import Match from '../database/models/Match';
import { createMatchValidation } from '../validations/validation';
import Message from '../utils/message';

async function getAllService(inProgress:
string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined) {
  if (inProgress) {
    const response = await getAllInprogress(inProgress === 'true');
    return {
      status: StatusCode.OK,
      message: response,
    };
  }

  const response = await getAll();
  return { message: response, status: StatusCode.OK };
}

async function searchTeam({ homeTeam, awayTeam }: ITeamExist) {
  // source: https://www.codegrepper.com/code-examples/javascript/op+in+sequelize
  const team = await Match.findAll({
    where: {
      [Op.or]: [{ id: homeTeam }, { id: awayTeam }],
    },
  });

  return !(!team[0] || !team[1]);
}

async function createService(match: ICreateMatch, authorization: string | undefined) {
  const jwtOk = await validateToken(authorization);
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;

  if (!authorization || !jwtOk) {
    return { message: 'Unauthorized', status: StatusCode.UNAUTHORIZED };
  }

  const teamsExist = await searchTeam({ homeTeam, awayTeam });
  if (!teamsExist) { return { message: Message.TEAM_NOT_EXIST, status: StatusCode.UNAUTHORIZED }; }

  const createValidation = await createMatchValidation(match);
  if (createValidation.status !== StatusCode.CREATED) {
    return createValidation;
  }

  const response: ICreateMatch = await Match.create({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
  });

  return {
    status: StatusCode.CREATED,
    message: response,
  };
}

async function finishMatchService(id: number) {
  await Match.update({ inProgress: false }, { where: { id } });
  return { status: StatusCode.OK, message: Message.MATCH_FINISHED };
}

export {
  getAllService,
  createService,
  finishMatchService,
};
