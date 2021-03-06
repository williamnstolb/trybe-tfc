import QueryString = require('qs');
import StatusCode from '../utils/statusCode';
import { getAllInprogress, getAll } from '../utils/matchs';
import { validateToken } from '../auth/Jwt';
import { ICreateMatch } from '../interface/match';
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

async function createService(match: ICreateMatch, authorization: string | undefined) {
  const jwtOk = await validateToken(authorization);
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;

  if (!authorization || !jwtOk) {
    return { message: '', status: StatusCode.UNAUTHORIZED };
  }

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

async function updateService(id: number, homeTeamGoals: number, awayTeamGoals: number) {
  await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return { status: StatusCode.OK, message: Message.MATCH_GOLS_UPDATED };
}

export {
  getAllService,
  createService,
  finishMatchService,
  updateService,
};
