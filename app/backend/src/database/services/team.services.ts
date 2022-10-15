import ITeam from '../interfaces/teamInterface';
import Teams from '../models/teams';

class TeamService {
  findTeams = async (): Promise<ITeam[]> => {
    const teams = await Teams.findAll() as ITeam[];
    return teams;
  };

  findById = async (id: number): Promise<number> => {
    const teamId = await Teams.findByPk(id);
    return teamId as unknown as number;
  };
}

export default TeamService;
