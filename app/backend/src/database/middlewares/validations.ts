import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const regexEmail = /\S+@\S+\.\S+/;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
  }

  if (!regexEmail.test(email)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  }

  if (password.length < 6) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Incorrect email or password' });
  }

  next();
};

export default validateLogin;
