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
  sortByName,
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
  const homeList = sortByName((await homeOrAwayService('home')).message);
  const awayList = sortByName((await homeOrAwayService('away')).message);

  const leaderboard: ILeaderboard[] = homeList.map((club, count = 0) => ({
    name: club.name,
    totalPoints: club.totalPoints + awayList[count].totalPoints,
    totalGames: club.totalGames + awayList[count].totalGames,
    totalVictories: club.totalVictories + awayList[count].totalVictories,
    totalDraws: club.totalDraws + awayList[count].totalDraws,
    totalLosses: club.totalLosses + awayList[count].totalLosses,
    goalsFavor: club.goalsFavor + awayList[count].goalsFavor,
    goalsOwn: club.goalsOwn + awayList[count].goalsOwn,
    goalsBalance: club.goalsBalance + awayList[count].goalsBalance,
    efficiency: Number((((club.totalPoints + awayList[count].totalPoints) / (
      (club.totalGames + awayList[count].totalGames) * 3)) * 100).toFixed(2)),
  }));

  const sortedLeaderboard = sortTeams(leaderboard);

  return { status: StatusCode.OK, message: sortedLeaderboard };
}

export {
  homeOrAwayService,
  leaderboardService,
};
