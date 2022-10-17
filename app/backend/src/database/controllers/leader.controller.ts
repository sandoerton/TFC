import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderService from '../services/leader.services';

class LeaderController {
  service = new LeaderService();

  public leaderBoard = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.service.homeLeader();
    return res.status(StatusCodes.OK).json(result);
  };
}

export default LeaderController;
