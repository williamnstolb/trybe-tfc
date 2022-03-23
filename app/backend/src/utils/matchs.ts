import Match from '../database/models/Match';
import Club from '../database/models/Club';

async function getAllInprogress(inProgress: boolean) {
  const response = await Match.findAll({
    where: { inProgress },
    include: [
      { model: Club, as: 'awayClub', attributes: ['clubName'] },
      { model: Club, as: 'homeClub', attributes: ['clubName'] },
    ],
  });
  return response;
}

async function getAll() {
  const response: Match[] = await Match.findAll(
    {
      include: [
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
      ],
    },
  );
  return response;
}

export {
  getAllInprogress,
  getAll,
};
