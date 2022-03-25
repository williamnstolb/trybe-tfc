import { firstBy } from 'thenby';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import { ILeaderboard } from '../interface/Leaderboard';

//   totalVictories: number;
//   totalGames: number;
//   totalVictories: number;
//   totalDraws: number;
//   totalLosses: number;
//   totalGoalsFavor: number;
//   GolsOwn: number;
//   totalGoalsDifference: number;
//   takeAdvantagePercentage: number;

async function getAllMatchsClub(club: Club) {
  const matches = await Match.findAll({ where: {
    homeTeam: club.id,
    inProgress: false,
  },
  attributes: ['homeTeamGoals', 'awayTeamGoals'],
  });

  return matches;
}

async function clubTotalVictories(club: Club) {
  const matches = await getAllMatchsClub(club);
  const totalVictories = matches.reduce((acc, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return totalVictories;
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
  const W = await clubTotalVictories(club);
  const D = await clubTotalDraws(club);

  const totalVictories = ((W * 3) + D);

  return totalVictories;
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
  const totalGoalsFavor = await Match.sum('homeTeamGoals', {
    where: {
      homeTeam: club.id,
      inProgress: 0,
    },
  });

  return totalGoalsFavor;
}

async function clubGoalsOwn(club: Club) {
  const golsOwn = await Match.sum('awayTeamGoals', {
    where: {
      homeTeam: club.id,
      inProgress: 0,
    },
  });

  return golsOwn;
}

async function clubTotalGoalsDifference(club: Club) {
  const goalsFavor = await clubTotalGoalsFavor(club);
  const goalsOwn = await clubGoalsOwn(club);
  const totalGoalsDifference = goalsFavor - goalsOwn;

  return totalGoalsDifference;
}

async function clubTakeAdvantagePercentage(club: Club) {
  const P = await clubTotalPoints(club);
  const J = await clubTotalGames(club);
  const takeAdvantagePercentage = Number(((P / (3 * J)) * 100).toFixed(2));

  return takeAdvantagePercentage;
}

// source: https://www.npmjs.com/package/thenby
function sortTeams(leaderboardList: ILeaderboard[]) {
  const sortedClubs = leaderboardList.sort(
    firstBy('totalPoints', { direction: 'desc' })
      .thenBy('totalVictories', { direction: 'desc' })
      .thenBy('goalsBalance', { direction: 'desc' })
      .thenBy('goalsFavor', { direction: 'desc' })
      .thenBy('goalsOwn', { direction: 'asc' }),
  );
  return sortedClubs;
}

export {
  clubTotalPoints,
  clubTotalGames,
  clubTotalVictories,
  clubTotalDraws,
  clubTotalLosses,
  clubTotalGoalsFavor,
  clubGoalsOwn,
  clubTotalGoalsDifference,
  clubTakeAdvantagePercentage,
  sortTeams,
};
