import { Request, Response } from 'express';
import ResponseStatusMessage from '../interface/Response';
import { getAllService, getByIdService } from '../service/clubsService';

async function getAllClubs(req: Request, res: Response): Promise<void> {
  const response: ResponseStatusMessage = await getAllService();
  res.status(response.status).json(response.message);
}

async function getByIdCLub(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const response: ResponseStatusMessage = await getByIdService(id);
  res.status(response.status).json(response.message);
}

export {
  getAllClubs,
  getByIdCLub,
};
