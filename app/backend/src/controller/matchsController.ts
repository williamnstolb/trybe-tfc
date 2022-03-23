import { Request, Response } from 'express';
import getAllMatchsService from '../service/matchsService';

async function getAllMatchs(_req: Request, res: Response): Promise<void> {
  const response: string | void = await getAllMatchsService();
  res.status(200).json(response);
}

export default getAllMatchs;
