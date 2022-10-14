import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
// const JWT_OPTIONS: SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

const tokenGenerate = (payload: string) => {
  const token = sign(payload, JWT_SECRET);
  return token;
};

const tokenCheck = (token:string) => {
  const payload = verify(token, JWT_SECRET);
  return payload;
};

export { tokenGenerate, tokenCheck };
