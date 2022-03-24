export interface ICreateMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface ITeamExist {
  homeTeam: number,
  awayTeam: number,
}
