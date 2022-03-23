import QueryString = require('qs');
import StatusCode from '../utils/statusCode';
import { getAllInprogress, getAll } from '../utils/matchs';

async function getAllService(inProgress:
string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined) {
  if (inProgress) {
    const response = await getAllInprogress(inProgress === 'true');
    return {
      status: StatusCode.OK,
      message: response,
    };
  }

  const response = await getAll();
  return { message: response, status: StatusCode.OK };
}

export default getAllService;
