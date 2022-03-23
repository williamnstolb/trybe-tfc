import StatusCode from '../utils/statusCode';
import { getAllInprogress, getAll } from '../utils/matchs';

async function getAllService(inProgress: boolean) {
  if (inProgress) {
    const response = await getAllInprogress(inProgress);
    return {
      status: StatusCode.OK,
      message: response,
    };
  }
  const response = await getAll();
  return { message: response, status: StatusCode.OK };
}

export default getAllService;
