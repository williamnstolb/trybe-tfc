import { Request, Response } from 'express';
import { getAllService, createService, finishMatchService } from '../service/matchsService';
import ResponseStatusMessage from '../interface/Response';

async function getAllMatchs(req: Request, res: Response): Promise<void> {
  const { inProgress } = req.query;
  const response: ResponseStatusMessage = await getAllService(inProgress);
  res.status(response.status).json(response.message);
}

async function create(req: Request, res: Response): Promise<void> {
  const { authorization } = req.headers;

  const response: ResponseStatusMessage = await createService(req.body, authorization);
  res.status(response.status).json(response.message);
}

async function finishMatch(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const response: ResponseStatusMessage = await finishMatchService(Number(id));

  res.status(response.status).json(response.message);
}

export {
  getAllMatchs,
  create,
  finishMatch,
};
