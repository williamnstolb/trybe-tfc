import { firstBy } from 'thenby';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import { ILeaderboard } from '../interface/Leaderboard';

//   totalPoints: number;
//   totalGames: number;
//   totalWins: number;
//   totalDraws: number;
//   totalLosses: number;
//   totalGoalsFor: number;
//   GolsOwn: number;
//   totalGoalsDifference: number;
//   takeAdvantagePercentage: number;

async function getAllMatchsClub(club: Club) {
  const matches = await Match.findAll({
    where: {
      homeTeam: club.id,
      inProgress: 0,
    },
    attributes: ['homeTeamGoals', 'awayTeamGoals'],
  });

  return matches;
}

async function clubTotalWins(club: Club) {
  const matches = await getAllMatchsClub(club);
  const totalWins = matches.reduce((acc, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return totalWins;
}

async function clubTotalDraws(club: Club) {
  const matches = await getAllMatchsClub(club);
  const totalDraws = matches.reduce((acc, curr) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return totalDraws;
}

async function clubTotalPoints(club: Club) {
  const W = await clubTotalWins(club);
  const D = await clubTotalDraws(club);
  if (club.clubName === 'Santos') {
    console.log(W, D);
  }
  const totalPoints = ((W * 3) + D);
  return totalPoints;
}

async function clubTotalGames(club: Club) {
  const totalGames = (await getAllMatchsClub(club)).length;
  return totalGames;
}

async function clubTotalLosses(club: Club) {
  const matches = await getAllMatchsClub(club);
  const totalLosses = matches.reduce((acc, curr) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return totalLosses;
}

async function clubTotalGoalsFavor(club: Club) {
  const totalGoalsFor = await Match.sum('homeTeamGoals', {
    where: {
      homeTeam: club.id,
      inProgress: 0,
    },
  });
  return totalGoalsFor;
}

async function clubGoalsOwn(club: Club) {
  const golsOwn = await Match.sum('awayTeamGoals', {
    where: {
      awayTeam: club.id,
      inProgress: 0,
    },
  });
  return golsOwn;
}

async function clubTotalGoalsDifference(club: Club) {
  const totalGoalsDifference = await clubTotalGoalsFavor(club) - await clubGoalsOwn(club);
  return totalGoalsDifference;
}

async function clubTakeAdvantagePercentage(club: Club) {
  const P = await clubTotalPoints(club);
  const J = await clubTotalGames(club);
  const takeAdvantagePercentage = Number(((P / ((3 * J))) * 100).toFixed(2));
  return takeAdvantagePercentage;
}

// source: https://www.npmjs.com/package/thenby
function sortTeams(leaderboardList: ILeaderboard[]) {
  const sortedClubs = leaderboardList.sort(
    firstBy('totalPoints', { direction: 'desc' })
      .thenBy('totalWins', { direction: 'desc' })
      .thenBy('totalGoalsDifference', { direction: 'desc' })
      .thenBy('totalGoalsFor', { direction: 'desc' })
      .thenBy('goalsOwn', { direction: 'asc' }),
  );
  return sortedClubs;
}

export {
  clubTotalPoints,
  clubTotalGames,
  clubTotalWins,
  clubTotalDraws,
  clubTotalLosses,
  clubTotalGoalsFavor,
  clubGoalsOwn,
  clubTotalGoalsDifference,
  clubTakeAdvantagePercentage,
  sortTeams,
};
