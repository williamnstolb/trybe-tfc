import { Request, Response } from 'express';
import { homeService, awayService } from '../service/leaderboardService';
import ResponseStatusMessage from '../interface/Response';

async function home(req: Request, res: Response) {
  const { status, message }: ResponseStatusMessage = await homeService();
  res.status(status).json(message);
}

async function away(req: Request, res: Response) {
  const { status, message }: ResponseStatusMessage = await awayService();
  res.status(status).json(message);
}

export {
  home,
  away,
};
