import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const regexEmail = /\S+@\S+\.\S+/;
  const { email, password } = req.body;

  if (!regexEmail.test(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid email' });
  }

  if (password.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Password must be at least 6 characters' });
  }

  next();
};

export default validateLogin;
