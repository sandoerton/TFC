import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../services/match.services';

class MatchController {
  service = new MatchService();

  public findMatches = async (req: Request, res: Response): Promise<Response> => {
    const matches = await this.service.findMatches();
    return res.status(StatusCodes.OK).json(matches);
  };
}

export default MatchController;
