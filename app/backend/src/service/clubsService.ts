import Club from '../database/models/Club';
import StatusCode from '../utils/statusCode';

async function getAllService() {
  const clubs: Club[] = await Club.findAll();
  return { message: clubs, status: StatusCode.OK };
}

export default getAllService;
