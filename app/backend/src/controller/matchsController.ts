import { Request, Response } from 'express';
import getAllService from '../service/matchsService';
import ResponseStatusMessage from '../interface/Response';

async function getAllMatchs(_req: Request, res: Response): Promise<void> {
  const response: ResponseStatusMessage = await getAllService();
  res.status(response.status).json(response.message);
}

export default getAllMatchs;