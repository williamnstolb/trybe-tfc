import Match from '../database/models/Match';
import Club from '../database/models/Club';
import StatusCode from '../utils/statusCode';

async function getAllService() {
  const response: Match[] = await Match.findAll(
    {
      include: [
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
      ],
    },
  );
  return { message: response, status: StatusCode.OK };
}

export default getAllService;
