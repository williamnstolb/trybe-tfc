export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalWins: number;
  totalDraws: number;
  totalLosses: number;
  totalGoalsFor: number;
  totalGoalsAgainst: number;
  totalGoalsDifference: number;
  takeAdvantagePercentage: number;
}
