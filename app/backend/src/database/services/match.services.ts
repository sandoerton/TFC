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

  createMatch = async (dataMatch: IMatch): Promise<IMatch> => {
    const newMatch = await Matches.create(dataMatch);
    return newMatch as IMatch;
  };

  updateMatch = async (id: number) => {
    const updated = await Matches.update({ inProgress: false }, { where: { id } });
    if (!updated) {
      throw new Error('Finish match no updated');
    }
    return updated;
  };

  upScoreGoals = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const updateScore = await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    if (!updateScore) {
      throw new Error('Score goals not updated');
    }
  };
}

export default MatchService;
