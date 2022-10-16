import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// import IMatch from '../interfaces/matchInterface';
import MatchService from '../services/match.services';

class MatchController {
  service = new MatchService();

  public findMatches = async (req: Request, res: Response): Promise<Response> => {
    const matches = await this.service.findMatches();
    return res.status(StatusCodes.OK).json(matches);
  };

  public createMatch = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;
    try {
      const newMatch = await this.service.createMatch(body);
      return res.status(StatusCodes.CREATED).json(newMatch);
    } catch (error) {
      const e = error as Error;
      return res.status(StatusCodes.NOT_FOUND).json({ message: e.message });
    }
  };
}

export default MatchController;
