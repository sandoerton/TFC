import IMatch from '../interfaces/matchInterface';
import Matches from '../models/matches';
import Teams from '../models/teams';

class MatchService {
  findMatches = async (): Promise<IMatch[]> => {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          association: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        { model: Teams,
          association: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  };
}

export default MatchService;
