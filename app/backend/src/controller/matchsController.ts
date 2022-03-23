import { Request, Response } from 'express';
import getAllService from '../service/matchsService';
import ResponseStatusMessage from '../interface/Response';

async function getAllMatchs(req: Request, res: Response): Promise<void> {
  const { inProgress } = req.query;
  let inProgressBoolean = false;
  if (inProgress === 'true') { inProgressBoolean = true; }
  const response: ResponseStatusMessage = await getAllService(inProgressBoolean);
  res.status(response.status).json(response.message);
}

export default getAllMatchs;
