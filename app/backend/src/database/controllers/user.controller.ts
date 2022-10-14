import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.services';

class UserController {
  service = new UserService();

  public findUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const token = await this.service.findUser(email, password);
      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      const e = error as Error;
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: e.message });
    }
  };

  public findRole = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    const role = await this.service.findRole(authorization as unknown as string);
    return res.status(StatusCodes.OK).json({ role });
  };
}

export default UserController;
