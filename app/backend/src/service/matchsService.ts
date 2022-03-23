import Match from '../database/models/Match';
import StatusCode from '../utils/statusCode';

async function getAllService() {
  const response: Match[] = await Match.findAll();
  return { message: response, status: StatusCode.OK };
}

export default getAllService;
