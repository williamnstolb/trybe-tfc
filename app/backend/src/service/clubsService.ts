import Club from '../database/models/Club';
import StatusCode from '../utils/statusCode';

async function getAllService() {
  const clubs: Club[] = await Club.findAll();
  return { message: clubs, status: StatusCode.OK };
}

async function getByIdService(id: string) {
  const club = await Club.findOne({ where: { id } });
  return { message: club, status: StatusCode.OK };
}

export {
  getAllService,
  getByIdService,
};
