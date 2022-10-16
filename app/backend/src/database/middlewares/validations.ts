import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { tokenCheck } from '../helpers/token';
import IUser from '../interfaces/userInterface';
import Users from '../models/users';

const validate = {
  login: (req: Request, res: Response, next: NextFunction) => {
    // const regexEmail = /\S+@\S+\.\S+/;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
    }
    next();
  },

  // if (!regexEmail.test(email)) {
  //   return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  // }

  // if (password.length < 6) {
  //   return res.status(StatusCodes.UNAUTHORIZED)
  //     .json({ message: 'Incorrect email or password' });
  // }

  token: async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    }
    try {
      const username = tokenCheck(authorization);
      const user = await Users.findOne({ where: { username }, raw: true }) as IUser;
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Token must be a valid token' });
      }
      next();
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token must be a valid token' });
    }
  },
};

export default validate;
