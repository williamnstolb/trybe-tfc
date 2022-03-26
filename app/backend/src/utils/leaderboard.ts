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

async function getAllMatchsClub(club: Club, selectKey: string) {
  switch (true) {
    case selectKey === 'home':
      return Match.findAll({ where: { homeTeam: club.id, inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
      });

    case selectKey === 'away':
      return Match.findAll({ where: { awayTeam: club.id, inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
      });

    default:
      return [];
  }
}

async function clubTotalVictories(club: Club, selectKey: string) {
  const matches = await getAllMatchsClub(club, selectKey);
  const totalVictories = matches.reduce((acc, curr) => {
    const test = (selectKey === 'home') ? (curr.homeTeamGoals > curr.awayTeamGoals) : (
      curr.homeTeamGoals < curr.awayTeamGoals);
    if (test) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return totalVictories;
}

async function clubTotalDraws(club: Club, selectKey: string) {
  const matches = await getAllMatchsClub(club, selectKey);
  const totalDraws = matches.reduce((acc, curr) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return totalDraws;
}

async function clubTotalPoints(club: Club, selectKey: string) {
  const W = await clubTotalVictories(club, selectKey);
  const D = await clubTotalDraws(club, selectKey);

  const totalVictories = ((W * 3) + D);

  return totalVictories;
}

async function clubTotalGames(club: Club, selectKey: string) {
  const totalGames = (await getAllMatchsClub(club, selectKey)).length;
  return totalGames;
}

async function clubTotalLosses(club: Club, selectKey: string) {
  const matches = await getAllMatchsClub(club, selectKey);
  const totalLosses = matches.reduce((acc, curr) => {
    const test = (selectKey === 'home') ? (curr.homeTeamGoals < curr.awayTeamGoals) : (
      curr.homeTeamGoals > curr.awayTeamGoals);
    if (test) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return totalLosses;
}

async function clubTotalGoalsFavor(club: Club, selectKey: string) {
  switch (true) {
    case selectKey === 'home':
      return Match.sum('homeTeamGoals', {
        where: {
          homeTeam: club.id,
          inProgress: 0,
        },
      });

    case selectKey === 'away':
      return Match.sum('awayTeamGoals', {
        where: {
          awayTeam: club.id,
          inProgress: 0,
        },
      });

    default:
      return 0;
  }
}

async function clubGoalsOwn(club: Club, selectKey: string) {
  switch (true) {
    case selectKey === 'home':
      return Match.sum('awayTeamGoals', {
        where: {
          homeTeam: club.id,
          inProgress: 0,
        },
      });

    case selectKey === 'away':
      return Match.sum('homeTeamGoals', {
        where: {
          awayTeam: club.id,
          inProgress: 0,
        },
      });
    default:
      return 0;
  }
}

async function clubTotalGoalsDifference(club: Club, selectKey: string) {
  const goalsFavor = await clubTotalGoalsFavor(club, selectKey);
  const goalsOwn = await clubGoalsOwn(club, selectKey);
  const totalGoalsDifference = goalsFavor - goalsOwn;

  return totalGoalsDifference;
}

async function clubTakeAdvantagePercentage(club: Club, selectKey: string) {
  const P = await clubTotalPoints(club, selectKey);
  const J = await clubTotalGames(club, selectKey);
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

function sortByName(leaderboardList: ILeaderboard[]) {
  const sortedClubs = leaderboardList.sort(
    firstBy('name', { direction: 'asc' }),
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
  sortByName,
};
