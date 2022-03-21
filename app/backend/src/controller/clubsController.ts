import { Request, Response } from 'express';
import ResponseStatusMessage from '../interface/Response';
import getAllService from '../service/clubsService';

async function getAll(req: Request, res: Response): Promise<void> {
  const response: ResponseStatusMessage = await getAllService();
  res.status(response.status).json(response.message);
}

export default getAll;
