import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderService from '../services/leader.services';

class LeaderController {
  service = new LeaderService();

  public homeBoard = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.service.homeLeader();
    return res.status(StatusCodes.OK).json(result);
  };

  public awayBoard = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.service.awayLeader();
    return res.status(StatusCodes.OK).json(result);
  };

  public board = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.service.leader();
    return res.status(StatusCodes.OK).json(result);
  };
}

export default LeaderController;
