import {
  clubTotalGames,
  clubTotalPoints,
  clubTotalWins,
  clubTotalDraws,
  clubTotalLosses,
  clubTotalGoalsFavor,
  clubGoalsOwn,
  clubTotalGoalsDifference,
  clubTakeAdvantagePercentage,
  sortTeams,

} from '../utils/leaderboard';
import Club from '../database/models/Club';
import { ILeaderboard } from '../interface/Leaderboard';

async function homeService() {
  const clubList = await Club.findAll();

  const leaderboard: ILeaderboard[] = await Promise.all(clubList.map(async (club) => ({
    name: club.clubName,
    totalPoints: await clubTotalPoints(club),
    totalGames: await clubTotalGames(club),
    totalWins: await clubTotalWins(club),
    totalDraws: await clubTotalDraws(club),
    totalLosses: await clubTotalLosses(club),
    goalsFavor: await clubTotalGoalsFavor(club),
    goalsOwn: await clubGoalsOwn(club),
    goalsBalance: await clubTotalGoalsDifference(club),
    efficiency: await clubTakeAdvantagePercentage(club),
  })));

  const sortedLeaderboard = sortTeams(leaderboard);
  return { status: 200, message: sortedLeaderboard };
}

async function awayService() {
  return { status: 200, message: 'teste' };
}

export {
  homeService,
  awayService,
};
