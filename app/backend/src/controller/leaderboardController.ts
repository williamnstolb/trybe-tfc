import { Request, Response } from 'express';
import { homeOrAwayService, leaderboardService } from '../service/leaderboardService';
import ResponseStatusMessage from '../interface/Response';

async function home(req: Request, res: Response) {
  const { status, message }: ResponseStatusMessage = await homeOrAwayService('home');
  res.status(status).json(message);
}

async function away(req: Request, res: Response) {
  const { status, message }: ResponseStatusMessage = await homeOrAwayService('away');
  res.status(status).json(message);
}

async function leaderboard(req: Request, res: Response) {
  const { status, message }: ResponseStatusMessage = await leaderboardService();
  res.status(status).json(message);
}

export {
  home,
  away,
  leaderboard,
};
