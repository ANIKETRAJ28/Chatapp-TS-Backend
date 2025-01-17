import { prisma } from '../config/db.config';
import { SALT } from '../config/env.config';
import { IUserRequest, IUserResponse } from '../interface/user.interface';
import bcrypt from 'bcrypt';
import { InternalServerError, NotFound } from '../util/apiResponse.util';

export class UserRepository {
  async createUser(data: IUserRequest): Promise<IUserResponse> {
    try {
      const randomId = Math.floor(Math.random() * 53) + 1;
      const avatar = `https://xsgames.co/randomusers/assets/avatars/pixel/${randomId}.jpg`;
      const salt = await bcrypt.genSalt(+SALT);
      data.password = await bcrypt.hash(data.password, salt);
      const user = await prisma.user.create({ data: { ...data, avatar } });
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async findUserByEmail(email: string): Promise<IUserResponse> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFound('User not found');
      }
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async findUserById(id: string): Promise<IUserResponse> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFound('User not found');
      }
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async findUserByUsername(username: string): Promise<IUserResponse> {
    try {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        throw new NotFound('User not found');
      }
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }
}
