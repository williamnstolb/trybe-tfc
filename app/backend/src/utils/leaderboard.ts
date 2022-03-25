import Club from '../database/models/Club';
import Match from '../database/models/Match';
//   name: string;
//   totalPoints: number;
//   totalGames: number;
//   totalWins: number;
//   totalDraws: number;
//   totalLosses: number;
//   totalGoalsFor: number;
//   totalGoalsAgainst: number;
//   totalGoalsDifference: number;
//   takeAdvantagePercentage: number;

function clubName(club: Club) {
  return club.clubName;
}

async function getAllMatchsClub(club: Club) {
  const matches = await Match.findAll({
    where: {
      homeClubId: club.id,
      inProgress: false,
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
  const totalPoints: number = await clubTotalWins(club) * 3 + await clubTotalDraws(club);
  return totalPoints;
}

async function clubTotalGames(club: Club) {
  const totalGames = (await getAllMatchsClub(club)).length;
  return totalGames;
}

// function clubTotalLosses(club: Club) {
//   const totalLosses = 0;
//   return totalLosses;
// }

async function clubTotalGoalsFor(club: Club) {
  const totalGoalsFor = await Match.sum('homeTeamGoals', {
    where: {
      homeClubId: club.id,
      inProgress: false,
    },
  });
  return totalGoalsFor;
}

async function clubTotalGoalsAgainst(club: Club) {
  const totalGoalsAgainst = await Match.sum('awayTeamGoals', {
    where: {
      awayClubId: club.id,
      inProgress: false,
    },
  });
  return totalGoalsAgainst;
}

async function clubTotalGoalsDifference(club: Club) {
  const totalGoalsDifference = await clubTotalGoalsFor(club) - await clubTotalGoalsAgainst(club);
  return totalGoalsDifference;
}

async function clubTakeAdvantagePercentage(club: Club) {
  const takeAdvantagePercentage = 0;
  return takeAdvantagePercentage;
}

export {
  clubName,
  clubTotalPoints,
  clubTotalGames,
  clubTotalWins,
  clubTotalDraws,
  // clubTotalLosses,
  clubTotalGoalsFor,
  clubTotalGoalsAgainst,
  clubTotalGoalsDifference,
  clubTakeAdvantagePercentage,
};
