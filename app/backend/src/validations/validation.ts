import { compareSync, hash } from 'bcryptjs';
import Message from '../utils/message';
import StatusCode from '../utils/statusCode';
import User from '../database/models/User';
import { IUser } from '../interface/User';
import ResponseStatusMessage from '../interface/Response';
import { ICreateMatch } from '../interface/match';

async function passwordCorrect(email: string, password: string): Promise<boolean> {
  const user: IUser | null = await User.findOne({ where: { email } });
  if (user) {
    const userPw = await hash(user.password, 10);
    return compareSync(password, userPw);
  }
  return false;
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
  passwordCorrect,
  createMatchValidation,
};
