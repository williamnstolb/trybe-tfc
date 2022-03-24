import { Request, Response } from 'express';
import getAllService from '../service/matchsService';
import ResponseStatusMessage from '../interface/Response';

async function getAllMatchs(req: Request, res: Response): Promise<void> {
  const { inProgress } = req.query;
  const response: ResponseStatusMessage = await getAllService(inProgress);
  res.status(response.status).json(response.message);
}

async function create(req: Request, res: Response): Promise<void> {
  console.log('apenas para teste');
  res.status(200).json('create');
}

export {
  getAllMatchs,
  create,
};
