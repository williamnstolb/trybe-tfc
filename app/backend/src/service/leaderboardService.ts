import {
  clubTotalGames,
  clubTotalPoints,
  clubTotalVictories,
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
import StatusCode from '../utils/statusCode';

async function homeOrAwayService(selectKey: string) {
  const clubList = await Club.findAll();

  const leaderboard: ILeaderboard[] = await Promise.all(clubList.map(async (club) => ({
    name: club.clubName,
    totalPoints: await clubTotalPoints(club, selectKey),
    totalGames: await clubTotalGames(club, selectKey),
    totalVictories: await clubTotalVictories(club, selectKey),
    totalDraws: await clubTotalDraws(club, selectKey),
    totalLosses: await clubTotalLosses(club, selectKey),
    goalsFavor: await clubTotalGoalsFavor(club, selectKey),
    goalsOwn: await clubGoalsOwn(club, selectKey),
    goalsBalance: await clubTotalGoalsDifference(club, selectKey),
    efficiency: await clubTakeAdvantagePercentage(club, selectKey),
  })));

  const sortedLeaderboard = sortTeams(leaderboard);
  return { status: StatusCode.OK, message: sortedLeaderboard };
}

async function leaderboardService() {
  // const home = (await homeOrAwayService('home')).message;
  // const away = (await homeOrAwayService('away')).message;
  // let count = 0;

  // const leaderboard: ILeaderboard[] = home.map((club) => {{
  //     nome: club.name,
  //     totalPoints: club.totalPoints + away[count].totalPoints,
  //     totalGames: club.totalGames + away[count].totalGames,
  //     totalVictories: club.totalVictories + away[count].totalVictories,
  //     totalDraws: club.totalDraws + away[count].totalDraws,
  //     totalLosses: club.totalLosses + away[count].totalLosses,
  //     goalsFavor: club.goalsFavor + away[count].goalsFavor,
  //     goalsOwn: club.goalsOwn + away[count].goalsOwn,
  //     goalsBalance: club.goalsBalance + away[count].goalsBalance,
  //     efficiency: club.efficiency + away[count].efficiency,
  //   };
  //   count += 1;
  //   }

  // const sortedLeaderboard = sortTeams(leaderboard);

  return { status: StatusCode.OK, message: 'sortedLeaderboard' };
}

export {
  homeOrAwayService,
  leaderboardService,
};
