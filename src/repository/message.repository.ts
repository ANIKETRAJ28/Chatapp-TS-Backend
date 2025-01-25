import { prisma } from '../config/db.config';
import { ICommunityFriendResponse } from '../interface/community.interface';
import { IMessageRequest, IMessageResponse } from '../interface/message.interface';
import { getIO } from '../socket';
import { InternalServerError, NotFound } from '../util/apiResponse.util';
import { CommunityRepository } from './community.repository';
import { UserRepository } from './user.reposiotry';

export class MessageRepository {
  private communityRepository: CommunityRepository;
  private userRepository: UserRepository;

  constructor() {
    this.communityRepository = new CommunityRepository();
    this.userRepository = new UserRepository();
  }

  async createMessage(data: IMessageRequest): Promise<IMessageResponse> {
    try {
      const message = await prisma.message.create({
        data,
        include: {
          user: true,
        },
      });
      const io = getIO();
      io.to(data.communityId).emit('message recieved', message);
      return message;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async cretaeMessageAndCommunity(
    data: IMessageRequest & { communityType: string },
  ): Promise<{ community: ICommunityFriendResponse } & { message: IMessageResponse }> {
    try {
      const newCommunity = await this.communityRepository.createFriendCommunity(data.userId, data.communityId);
      data.communityId = newCommunity.id;
      const message = await prisma.message.create({
        data: {
          content: data.content,
          type: data.type,
          userId: data.userId,
          communityId: data.communityId,
        },
        include: {
          user: true,
        },
      });
      const user = await this.userRepository.findUserById(data.userId);
      const io = getIO();
      io.to(data.userId).emit('add community', {
        id: newCommunity.id,
        type: newCommunity.type,
        users: newCommunity.users,
        friend: {
          id: newCommunity.friend.id,
          name: newCommunity.friend.name,
          email: newCommunity.friend.email,
          username: newCommunity.friend.username,
          avatar: newCommunity.friend.avatar,
        },
      });
      io.to(newCommunity.friend.id).emit('add community', {
        id: newCommunity.id,
        type: newCommunity.type,
        users: newCommunity.users,
        friend: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
        },
      });
      io.to(newCommunity.id).emit('message recieved', message);
      return { community: newCommunity, message: message };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async getMessageById(id: string): Promise<IMessageResponse> {
    try {
      const message = await prisma.message.findUnique({
        where: { id },
        include: {
          user: true,
        },
      });
      if (!message) {
        throw new NotFound('Message not found');
      }
      return message;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async getMessagesByCommunityId(communityId: string): Promise<IMessageResponse[]> {
    try {
      const messages = await prisma.message.findMany({
        where: { communityId },
        include: {
          user: true,
        },
      });

      return messages;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async deleteMessage(id: string): Promise<IMessageResponse> {
    try {
      const message = await prisma.message.update({
        where: { id },
        data: { isDeleted: true },
        include: {
          user: true,
        },
      });
      return message;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }
}
