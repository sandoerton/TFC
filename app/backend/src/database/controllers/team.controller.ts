import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/team.services';

class TeamController {
  service = new TeamService();

  public findTeams = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this.service.findTeams();
    return res.status(StatusCodes.OK).json(teams);
  };

  public findById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const team = await this.service.findById(id as unknown as number);
    return res.status(StatusCodes.OK).json(team);
  };
}

export default TeamController;
