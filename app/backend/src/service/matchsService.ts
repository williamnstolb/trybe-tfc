import QueryString = require('qs');
import StatusCode from '../utils/statusCode';
import { getAllInprogress, getAll } from '../utils/matchs';
import { validateToken } from '../auth/Jwt';
import { ICreateMatch } from '../interface/match';
import Match from '../database/models/Match';
import { createMatchValidation } from '../validations/validation';

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
    return { message: 'Unauthorized', status: StatusCode.UNAUTHORIZED };
  }

  const createValidation = await createMatchValidation(match);
  if (createValidation.status !== StatusCode.OK) {
    return createValidation;
  }

  const response: ICreateMatch = await Match.create({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
  });

  return {
    status: StatusCode.OK,
    message: response,
  };
}

export {
  getAllService,
  createService,
};
