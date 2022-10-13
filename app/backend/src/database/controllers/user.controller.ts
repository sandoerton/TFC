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
      return res.status(StatusCodes.NOT_FOUND).json({ message: e.message });
    }
  };
}

export default UserController;
