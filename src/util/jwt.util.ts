import { IUserResponse } from '../interface/user.interface';
import jwt from 'jsonwebtoken';

export function createJWTtoken(user: IUserResponse): string {
  const token = jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
  return token;
}
