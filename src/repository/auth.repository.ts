import { prisma } from '../config/db.config';
import bcrypt from 'bcrypt';
import { BadRequest, InternalServerError, NotFound } from '../util/apiResponse.util';
import { createJWTtoken } from '../util/jwt.util';

export class AuthRepository {
  async signInByEmail(email: string, password: string): Promise<string> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFound('User not found');
      }
      const isMatch = bcrypt.compare(user.password, password);
      if (!isMatch) throw new BadRequest('Email or password incorrect');
      const token = createJWTtoken({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
      return token;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async signInByUsername(username: string, password: string): Promise<string> {
    try {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        throw new NotFound('User not found');
      }
      const isMatch = bcrypt.compare(user.password, password);
      if (!isMatch) throw new BadRequest('Email or password incorrect');
      const token = createJWTtoken({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
      return token;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }
}
