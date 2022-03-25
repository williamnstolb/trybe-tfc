import { Request, Response } from 'express';
import { getAllService,
  createService, finishMatchService, updateService } from '../service/matchsService';
import ResponseStatusMessage from '../interface/Response';

async function getAllMatchs(req: Request, res: Response): Promise<void> {
  const { inProgress } = req.query;
  const { status, message }: ResponseStatusMessage = await getAllService(inProgress);
  res.status(status).json(message);
}

async function create(req: Request, res: Response): Promise<void> {
  const { authorization } = req.headers;

  const { status, message }: ResponseStatusMessage = await createService(req.body, authorization);
  if (status !== 201) {
    res.status(status).json({ message });
  } else {
    res.status(status).json(message);
  }
}

async function finishMatch(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { status, message }: ResponseStatusMessage = await finishMatchService(Number(id));

  res.status(status).json(message);
}

async function updateMatch(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { status, message }: ResponseStatusMessage = await updateService(
    Number(id),
    homeTeamGoals,
    awayTeamGoals,
  );

  res.status(status).json({ message });
}

export {
  getAllMatchs,
  create,
  finishMatch,
  updateMatch,
};
